import { useEffect, useReducer, useRef } from 'react';
import { ALEATORIA, CATEGORIAS, NIVELES, azar, elegirPalabra, letrasDe, normalizar } from '../data/palabras';
import { useApp } from '../context/AppContext';
import useFeedback from './useFeedback';

export const VIDAS = 3; // palabras que se pueden perder en una partida
export const MAX_ERRORES = 6; // errores por palabra (partes del dibujo)
const PUNTOS_LETRA = 10;
const BONO_VICTORIA = 50;
const PUNTOS_ERROR_SOBRANTE = 10;

const PARTIDA_NUEVA = { vidas: VIDAS, puntos: 0, ronda: 0, acertadas: 0 };

// Nueva palabra; conserva las vidas, los puntos y las palabras acertadas de la partida.
function nuevaRonda({ categoriaId, nivelId, anterior }, partida = PARTIDA_NUEVA) {
  const nivel = NIVELES.find((n) => n.id === nivelId);
  const { palabra, categoria } = elegirPalabra(categoriaId, nivelId, anterior);
  return {
    ...partida,
    ronda: partida.ronda + 1,
    palabra, categoria, nivel,
    usadas: {}, // { A: 'acierto', E: 'fallo', ... }
    errores: 0,
    puntosRonda: 0,
    pistas: nivel.pistas,
    tiempo: nivel.tiempo, // null si el nivel no tiene cronómetro
    estado: 'jugando', // 'jugando' | 'ganado' | 'perdido'
    porTiempo: false,
  };
}

// El total nunca baja de 0; puntosRonda guarda lo ganado con la palabra actual.
function sumarPuntos(s, cantidad) {
  const puntos = Math.max(0, s.puntos + cantidad);
  return { puntos, puntosRonda: s.puntosRonda + puntos - s.puntos };
}

// Cierra la palabra: si se adivinó suma una acertada, si no, resta una vida.
const terminarRonda = (s, gano, porTiempo = false) =>
  gano ? { ...s, estado: 'ganado', acertadas: s.acertadas + 1 } : { ...s, estado: 'perdido', vidas: s.vidas - 1, porTiempo };

// Aplica una letra (tocada o revelada por pista) y revisa si se ganó o perdió la palabra.
function aplicarLetra(s, letra, esPista) {
  const veces = [...s.palabra].filter((c) => normalizar(c) === letra).length;
  const usadas = { ...s.usadas, [letra]: veces ? 'acierto' : 'fallo' };
  const errores = s.errores + (veces ? 0 : 1);
  const m = s.nivel.multiplicador;
  const gano = [...letrasDe(s.palabra)].every((l) => usadas[l] === 'acierto');

  let ganados = esPista ? -s.nivel.costoPista : veces * PUNTOS_LETRA * m;
  if (gano) ganados += (BONO_VICTORIA + (MAX_ERRORES - errores) * PUNTOS_ERROR_SOBRANTE) * m + (s.tiempo ?? 0);

  const siguiente = { ...s, ...sumarPuntos(s, ganados), usadas, errores, pistas: esPista ? s.pistas - 1 : s.pistas };
  if (gano) return terminarRonda(siguiente, true);
  return errores >= MAX_ERRORES ? terminarRonda(siguiente, false) : siguiente;
}

function reducer(s, accion) {
  const jugando = s.estado === 'jugando';
  switch (accion.type) {
    case 'LETRA':
      return jugando && !s.usadas[accion.letra] ? aplicarLetra(s, accion.letra, false) : s;
    case 'PISTA':
      return jugando && s.pistas > 0 ? aplicarLetra(s, accion.letra, true) : s;
    case 'TICK':
      if (!jugando) return s;
      return s.tiempo > 1 ? { ...s, tiempo: s.tiempo - 1 } : terminarRonda({ ...s, tiempo: 0 }, false, true);
    case 'NUEVA':
      return accion.ronda;
    default:
      return s;
  }
}

// Lógica y estado de una partida del ahorcado (3 vidas, varias palabras).
export default function useJuego(categoriaId, nivelId) {
  const { config, registrarPalabra, registrarPuntaje } = useApp();
  const feedback = useFeedback();
  const [juego, dispatch] = useReducer(reducer, { categoriaId, nivelId }, nuevaRonda);
  const { estado, palabra, usadas } = juego;
  const conTiempo = juego.nivel.tiempo !== null;

  // El puntaje de la partida va al top 10 una sola vez: al perder las 3 vidas o al salir del juego.
  const actual = useRef(juego);
  actual.current = juego;
  const guardado = useRef(false);
  const guardarPuntaje = () => {
    const { puntos, acertadas, nivel } = actual.current;
    if (guardado.current || puntos === 0) return;
    guardado.current = true;
    const categoria = [...CATEGORIAS, ALEATORIA].find((c) => c.id === categoriaId).nombre;
    registrarPuntaje({ jugador: config.jugador, puntos, acertadas, categoria, nivel: nivel.nombre });
  };
  useEffect(() => () => guardarPuntaje(), []); // eslint-disable-line react-hooks/exhaustive-deps

  // Cronómetro (solo nivel difícil), se reinicia con cada palabra.
  useEffect(() => {
    if (!conTiempo || estado !== 'jugando') return undefined;
    const id = setInterval(() => dispatch({ type: 'TICK' }), 1000);
    return () => clearInterval(id);
  }, [conTiempo, estado, palabra]);

  // Fin de cada palabra: vibración/sonido y estadísticas.
  useEffect(() => {
    if (estado === 'jugando') return;
    const gano = estado === 'ganado';
    feedback(gano ? 'victoria' : 'derrota');
    registrarPalabra(gano);
    if (juego.vidas === 0) guardarPuntaje();
  }, [estado]); // eslint-disable-line react-hooks/exhaustive-deps

  const tocarLetra = (letra) => {
    if (estado !== 'jugando' || usadas[letra]) return;
    feedback(letrasDe(palabra).has(letra) ? 'acierto' : 'error');
    dispatch({ type: 'LETRA', letra });
  };

  const pedirPista = () => {
    const faltantes = [...letrasDe(palabra)].filter((l) => !usadas[l]);
    if (estado !== 'jugando' || juego.pistas === 0 || faltantes.length === 0) return;
    dispatch({ type: 'PISTA', letra: azar(faltantes) });
  };

  const { vidas, puntos, ronda, acertadas } = juego;
  const siguientePalabra = () =>
    dispatch({ type: 'NUEVA', ronda: nuevaRonda({ categoriaId, nivelId, anterior: palabra }, { vidas, puntos, ronda, acertadas }) });

  const jugarDeNuevo = () => {
    guardado.current = false;
    dispatch({ type: 'NUEVA', ronda: nuevaRonda({ categoriaId, nivelId, anterior: palabra }) });
  };

  return {
    ...juego,
    terminado: estado !== 'jugando',
    finDelJuego: vidas === 0,
    tocarLetra,
    pedirPista,
    siguientePalabra,
    jugarDeNuevo,
  };
}

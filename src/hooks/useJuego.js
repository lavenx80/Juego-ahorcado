import { useEffect, useReducer } from 'react';
import { NIVELES, azar, elegirPalabra, letrasDe, normalizar } from '../data/palabras';
import { useApp } from '../context/AppContext';
import useFeedback from './useFeedback';

export const MAX_ERRORES = 6;
const PUNTOS_LETRA = 10;
const BONO_VICTORIA = 50;
const PUNTOS_VIDA = 10;

function nuevaPartida({ categoriaId, nivelId, anterior }) {
  const nivel = NIVELES.find((n) => n.id === nivelId);
  const { palabra, categoria } = elegirPalabra(categoriaId, nivelId, anterior);
  return {
    palabra, categoria, nivel,
    usadas: {}, // { A: 'acierto', E: 'fallo', ... }
    errores: 0,
    puntos: 0,
    pistas: nivel.pistas,
    tiempo: nivel.tiempo, // null si el nivel no tiene cronómetro
    estado: 'jugando', // 'jugando' | 'ganado' | 'perdido'
    porTiempo: false,
  };
}

// Aplica una letra (tocada o revelada por pista) y revisa si hay victoria o derrota.
function aplicarLetra(s, letra, esPista) {
  const veces = [...s.palabra].filter((c) => normalizar(c) === letra).length;
  const usadas = { ...s.usadas, [letra]: veces ? 'acierto' : 'fallo' };
  const errores = s.errores + (veces ? 0 : 1);
  const m = s.nivel.multiplicador;
  let puntos = esPista ? Math.max(0, s.puntos - s.nivel.costoPista) : s.puntos + veces * PUNTOS_LETRA * m;

  const gano = [...letrasDe(s.palabra)].every((l) => usadas[l] === 'acierto');
  if (gano) puntos += (BONO_VICTORIA + (MAX_ERRORES - errores) * PUNTOS_VIDA) * m + (s.tiempo ?? 0);
  const estado = gano ? 'ganado' : errores >= MAX_ERRORES ? 'perdido' : 'jugando';

  return { ...s, usadas, errores, puntos, estado, pistas: esPista ? s.pistas - 1 : s.pistas };
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
      return s.tiempo > 1 ? { ...s, tiempo: s.tiempo - 1 } : { ...s, tiempo: 0, estado: 'perdido', porTiempo: true };
    case 'NUEVA':
      return accion.partida;
    default:
      return s;
  }
}

// Lógica y estado de una partida del ahorcado.
export default function useJuego(categoriaId, nivelId) {
  const { config, registrarPartida } = useApp();
  const feedback = useFeedback();
  const [juego, dispatch] = useReducer(reducer, { categoriaId, nivelId }, nuevaPartida);
  const { estado, palabra, usadas } = juego;
  const conTiempo = juego.nivel.tiempo !== null;

  // Cronómetro (solo nivel difícil).
  useEffect(() => {
    if (!conTiempo || estado !== 'jugando') return undefined;
    const id = setInterval(() => dispatch({ type: 'TICK' }), 1000);
    return () => clearInterval(id);
  }, [conTiempo, estado, palabra]);

  // Fin de la partida: vibración/sonido y guardado de estadísticas.
  useEffect(() => {
    if (estado === 'jugando') return;
    const gano = estado === 'ganado';
    feedback(gano ? 'victoria' : 'derrota');
    registrarPartida({
      gano,
      jugador: config.jugador,
      palabra,
      categoria: juego.categoria.nombre,
      nivel: juego.nivel.nombre,
      puntos: juego.puntos,
    });
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

  const reiniciar = () =>
    dispatch({ type: 'NUEVA', partida: nuevaPartida({ categoriaId, nivelId, anterior: palabra }) });

  return { ...juego, terminado: estado !== 'jugando', tocarLetra, pedirPista, reiniciar };
}

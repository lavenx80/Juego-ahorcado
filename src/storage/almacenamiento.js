import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';

const CLAVES = { config: '@ahorcado/config', estadisticas: '@ahorcado/estadisticas' };

// La primera vez, el tema sigue el modo (claro/oscuro) del celular.
export const CONFIG_INICIAL = {
  jugador: '',
  sonido: true,
  vibracion: true,
  tema: Appearance.getColorScheme() === 'dark' ? 'oscuro' : 'claro',
};
export const ESTADISTICAS_INICIALES = { jugadas: 0, ganadas: 0, racha: 0, mejorRacha: 0, puntajes: [] };

async function leer(clave, inicial) {
  try {
    const valor = await AsyncStorage.getItem(clave);
    return valor ? { ...inicial, ...JSON.parse(valor) } : inicial;
  } catch {
    return inicial;
  }
}

const guardar = (clave, valor) => AsyncStorage.setItem(clave, JSON.stringify(valor)).catch(() => {});

export const cargarConfig = () => leer(CLAVES.config, CONFIG_INICIAL);
export const guardarConfig = (config) => guardar(CLAVES.config, config);
export const cargarEstadisticas = () => leer(CLAVES.estadisticas, ESTADISTICAS_INICIALES);
export const guardarEstadisticas = (estadisticas) => guardar(CLAVES.estadisticas, estadisticas);

// Suma una palabra terminada (adivinada o no) y actualiza las rachas.
export function sumarPalabra(e, gano) {
  const racha = gano ? e.racha + 1 : 0;
  return {
    ...e,
    jugadas: e.jugadas + 1,
    ganadas: e.ganadas + (gano ? 1 : 0),
    racha,
    mejorRacha: Math.max(e.mejorRacha, racha),
  };
}

// Agrega el puntaje final de una partida y deja solo el top 10.
export function sumarPuntaje(e, puntaje) {
  const puntajes = [...e.puntajes, { ...puntaje, fecha: Date.now() }]
    .filter((p) => p.puntos > 0)
    .sort((a, b) => b.puntos - a.puntos)
    .slice(0, 10);
  return { ...e, puntajes };
}

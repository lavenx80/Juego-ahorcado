import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import {
  CONFIG_INICIAL, ESTADISTICAS_INICIALES, cargarConfig, cargarEstadisticas,
  guardarConfig, guardarEstadisticas, sumarPalabra, sumarPuntaje,
} from '../storage/almacenamiento';
import { temas } from '../theme/colores';

const AppContext = createContext(null);
const esperar = (ms) => new Promise((r) => setTimeout(r, ms));

// Estado global: configuración, estadísticas y colores del tema activo.
export function AppProvider({ children }) {
  const [config, setConfig] = useState(CONFIG_INICIAL);
  const [estadisticas, setEstadisticas] = useState(ESTADISTICAS_INICIALES);
  const [listo, setListo] = useState(false);

  // Mientras se ve el splash se cargan la configuración y las estadísticas.
  useEffect(() => {
    Promise.all([cargarConfig(), cargarEstadisticas(), esperar(1500)]).then(([c, e]) => {
      setConfig(c);
      setEstadisticas(e);
      setListo(true);
    });
  }, []);

  const actualizarConfig = useCallback((cambios) => {
    setConfig((actual) => {
      const nueva = { ...actual, ...cambios };
      guardarConfig(nueva);
      return nueva;
    });
  }, []);

  // Aplica un cambio a las estadísticas y lo guarda.
  const cambiarEstadisticas = useCallback((cambio) => {
    setEstadisticas((actual) => {
      const nuevas = cambio(actual);
      guardarEstadisticas(nuevas);
      return nuevas;
    });
  }, []);
  const registrarPalabra = useCallback((gano) => cambiarEstadisticas((e) => sumarPalabra(e, gano)), [cambiarEstadisticas]);
  const registrarPuntaje = useCallback((p) => cambiarEstadisticas((e) => sumarPuntaje(e, p)), [cambiarEstadisticas]);

  const borrarEstadisticas = useCallback(() => {
    setEstadisticas(ESTADISTICAS_INICIALES);
    guardarEstadisticas(ESTADISTICAS_INICIALES);
  }, []);

  const valor = useMemo(
    () => ({
      listo, config, estadisticas, colores: temas[config.tema],
      actualizarConfig, registrarPalabra, registrarPuntaje, borrarEstadisticas,
    }),
    [listo, config, estadisticas, actualizarConfig, registrarPalabra, registrarPuntaje, borrarEstadisticas],
  );

  return <AppContext.Provider value={valor}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);

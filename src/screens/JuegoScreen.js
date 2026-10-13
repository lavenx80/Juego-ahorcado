import { useEffect, useState } from 'react';
import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { usePreventRemove } from '@react-navigation/native';
import Ahorcado from '../components/Ahorcado';
import Boton from '../components/Boton';
import Marcador from '../components/Marcador';
import ModalResultado from '../components/ModalResultado';
import PalabraOculta from '../components/PalabraOculta';
import Pantalla from '../components/Pantalla';
import Teclado from '../components/Teclado';
import useJuego, { MAX_ERRORES } from '../hooks/useJuego';
import confirmar from '../utils/confirmar';

export default function JuegoScreen({ navigation, route }) {
  const { categoriaId, nivelId } = route.params;
  const juego = useJuego(categoriaId, nivelId);
  const { height } = useWindowDimensions();
  const [verResultado, setVerResultado] = useState(false);

  // Se espera un momento antes del modal para que se vea el dibujo y la palabra final.
  useEffect(() => {
    if (!juego.terminado) {
      setVerResultado(false);
      return undefined;
    }
    const id = setTimeout(() => setVerResultado(true), 900);
    return () => clearTimeout(id);
  }, [juego.terminado]);

  // RF-15: confirmar antes de salir con «atrás» en medio de una partida.
  usePreventRemove(!juego.terminado, ({ data }) =>
    confirmar('¿Abandonar la partida?', 'Perderás el progreso de esta palabra.', 'Salir', () =>
      navigation.dispatch(data.action),
    ),
  );

  return (
    <Pantalla estilo={styles.pantalla}>
      <Marcador
        categoria={juego.categoria}
        nivel={juego.nivel}
        vidas={MAX_ERRORES - juego.errores}
        maxVidas={MAX_ERRORES}
        puntos={juego.puntos}
        tiempo={juego.tiempo}
      />

      <View style={styles.centro}>
        <Ahorcado errores={juego.errores} perdio={juego.estado === 'perdido'} tamano={Math.max(110, Math.min(200, height - 560))} />
        <PalabraOculta palabra={juego.palabra} usadas={juego.usadas} terminado={juego.terminado} />
      </View>

      <Boton
        titulo={`Pista (${juego.pistas}) · −${juego.nivel.costoPista} pts`}
        icono="💡"
        variante="secundario"
        deshabilitado={juego.pistas === 0 || juego.terminado}
        onPress={juego.pedirPista}
      />
      <Teclado usadas={juego.usadas} onLetra={juego.tocarLetra} deshabilitado={juego.terminado} />

      <ModalResultado
        visible={verResultado}
        gano={juego.estado === 'ganado'}
        porTiempo={juego.porTiempo}
        palabra={juego.palabra}
        puntos={juego.puntos}
        onJugarDeNuevo={juego.reiniciar}
        onMenu={() => navigation.popToTop()}
      />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  pantalla: { paddingHorizontal: 8, paddingTop: 10, gap: 10 },
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
});

import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { usePreventRemove } from '@react-navigation/native';
import Ahorcado from '../components/Ahorcado';
import Boton from '../components/Boton';
import Marcador from '../components/Marcador';
import ModalResultado from '../components/ModalResultado';
import PalabraOculta from '../components/PalabraOculta';
import Pantalla from '../components/Pantalla';
import Teclado from '../components/Teclado';
import { useApp } from '../context/AppContext';
import useJuego, { VIDAS } from '../hooks/useJuego';
import confirmar from '../utils/confirmar';

export default function JuegoScreen({ navigation, route }) {
  const { categoriaId, nivelId } = route.params;
  const juego = useJuego(categoriaId, nivelId);
  const { colores } = useApp();
  const { height } = useWindowDimensions();
  const [verResultado, setVerResultado] = useState(false);

  // El resultado sale solo al final de la partida, después de un momento para que se vea el dibujo y la palabra.
  useEffect(() => {
    if (!juego.finDelJuego) {
      setVerResultado(false);
      return undefined;
    }
    const id = setTimeout(() => setVerResultado(true), 1200);
    return () => clearTimeout(id);
  }, [juego.finDelJuego]);

  // Aviso corto al terminar cada palabra; el juego sigue solo con la siguiente.
  const gano = juego.estado === 'ganado';
  const aviso = gano ? `🎉 ¡Adivinada! +${juego.puntosRonda} pts` : juego.porTiempo ? '⏰ ¡Se acabó el tiempo!' : '💔 ¡Perdiste una vida!';

  // RF-15: confirmar antes de salir con «atrás» en medio de una palabra.
  usePreventRemove(!juego.terminado, ({ data }) =>
    confirmar('¿Abandonar la partida?', 'Perderás esta palabra, pero tu puntaje acumulado quedará guardado.', 'Salir', () =>
      navigation.dispatch(data.action),
    ),
  );

  return (
    <Pantalla estilo={styles.pantalla}>
      <Marcador
        categoria={juego.categoria}
        nivel={juego.nivel}
        ronda={juego.ronda}
        vidas={juego.vidas}
        maxVidas={VIDAS}
        puntos={juego.puntos}
        tiempo={juego.tiempo}
      />

      <View style={styles.centro}>
        <Ahorcado errores={juego.errores} perdio={juego.estado === 'perdido'} tamano={Math.max(110, Math.min(200, height - 560))} />
        <PalabraOculta palabra={juego.palabra} usadas={juego.usadas} terminado={juego.terminado} />
      </View>

      {juego.terminado ? (
        <View style={[styles.aviso, { borderColor: gano ? colores.acierto : colores.fallo }]}>
          <Text style={[styles.textoAviso, { color: gano ? colores.acierto : colores.fallo }]}>{aviso}</Text>
        </View>
      ) : (
        <Boton
          titulo={`Pista (${juego.pistas}) · −${juego.nivel.costoPista} pts`}
          icono="💡"
          variante="secundario"
          deshabilitado={juego.pistas === 0}
          onPress={juego.pedirPista}
        />
      )}
      <Teclado usadas={juego.usadas} onLetra={juego.tocarLetra} deshabilitado={juego.terminado} />

      <ModalResultado
        visible={verResultado && juego.finDelJuego}
        juego={juego}
        onJugarDeNuevo={juego.jugarDeNuevo}
        onMenu={() => navigation.popToTop()}
      />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  pantalla: { paddingHorizontal: 8, paddingTop: 10, gap: 10 },
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  aviso: { minHeight: 52, borderRadius: 14, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  textoAviso: { fontSize: 17, fontWeight: '800' },
});

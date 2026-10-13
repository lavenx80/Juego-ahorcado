import { Modal, StyleSheet, Text, View } from 'react-native';
import { useApp } from '../context/AppContext';
import Boton from './Boton';
import { Corazones } from './Marcador';

const palabras = (n) => `${n} ${n === 1 ? 'palabra adivinada' : 'palabras adivinadas'}`;

// Resultado de cada palabra. Con vidas se sigue jugando; sin vidas es el fin de la partida.
export default function ModalResultado({ visible, juego, maxVidas, onSiguiente, onJugarDeNuevo, onMenu }) {
  const { colores } = useApp();
  const { estado, porTiempo, palabra, puntos, puntosRonda, vidas, acertadas, finDelJuego } = juego;
  const gano = estado === 'ganado';
  const [emoji, titulo] = gano
    ? ['🎉', '¡Palabra adivinada!']
    : finDelJuego
      ? ['🏁', '¡Fin del juego!']
      : porTiempo
        ? ['⏰', '¡Se acabó el tiempo!']
        : ['💔', '¡Perdiste una vida!'];

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onMenu}>
      <View style={styles.fondo}>
        <View style={[styles.tarjeta, { backgroundColor: colores.superficie }]}>
          <Text style={styles.emoji}>{emoji}</Text>
          <Text style={[styles.titulo, { color: gano ? colores.acierto : colores.fallo }]}>{titulo}</Text>
          <Text style={[styles.etiqueta, { color: colores.textoSuave }]}>La palabra era</Text>
          <Text style={[styles.palabra, { color: colores.texto }]}>{palabra}</Text>

          {!finDelJuego && (
            <>
              <Corazones vidas={vidas} total={maxVidas} tamano={28} />
              <Text style={[styles.etiqueta, { color: colores.textoSuave }]}>
                {vidas === 1 ? 'Te queda 1 vida' : `Te quedan ${vidas} vidas`}
              </Text>
            </>
          )}
          <Text style={[styles.puntos, { color: colores.texto }]}>⭐ {puntos} puntos</Text>
          <Text style={[styles.detalle, { color: colores.textoSuave }]}>
            {finDelJuego ? palabras(acertadas) : `${puntosRonda > 0 ? '+' : ''}${puntosRonda} con esta palabra`}
          </Text>

          {finDelJuego ? (
            <Boton titulo="Jugar de nuevo" icono="🔄" onPress={onJugarDeNuevo} estilo={styles.boton} />
          ) : (
            <Boton titulo="Siguiente palabra" icono="▶" onPress={onSiguiente} estilo={styles.boton} />
          )}
          <Boton titulo="Menú" icono="🏠" variante="secundario" onPress={onMenu} estilo={styles.boton} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  fondo: { flex: 1, backgroundColor: 'rgba(0,0,0,0.55)', justifyContent: 'center', padding: 24 },
  tarjeta: { borderRadius: 20, padding: 24, alignItems: 'center', gap: 6 },
  emoji: { fontSize: 52 },
  titulo: { fontSize: 28, fontWeight: '800', textAlign: 'center' },
  etiqueta: { fontSize: 14, marginTop: 4 },
  palabra: { fontSize: 24, fontWeight: '800', letterSpacing: 2, textAlign: 'center' },
  puntos: { fontSize: 20, fontWeight: '700', marginTop: 8 },
  detalle: { fontSize: 14, marginBottom: 8 },
  boton: { alignSelf: 'stretch', marginTop: 6 },
});

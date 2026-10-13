import { Modal, StyleSheet, Text, View } from 'react-native';
import { useApp } from '../context/AppContext';
import Boton from './Boton';

// Ventana de victoria o derrota con la palabra completa y el puntaje.
export default function ModalResultado({ visible, gano, porTiempo, palabra, puntos, onJugarDeNuevo, onMenu }) {
  const { colores } = useApp();
  const titulo = gano ? '¡Ganaste!' : porTiempo ? '¡Se acabó el tiempo!' : '¡Perdiste!';

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onMenu}>
      <View style={styles.fondo}>
        <View style={[styles.tarjeta, { backgroundColor: colores.superficie }]}>
          <Text style={styles.emoji}>{gano ? '🎉' : porTiempo ? '⏰' : '😵'}</Text>
          <Text style={[styles.titulo, { color: gano ? colores.acierto : colores.fallo }]}>{titulo}</Text>
          <Text style={[styles.etiqueta, { color: colores.textoSuave }]}>La palabra era</Text>
          <Text style={[styles.palabra, { color: colores.texto }]}>{palabra}</Text>
          <Text style={[styles.puntos, { color: colores.texto }]}>⭐ {puntos} puntos</Text>
          <Boton titulo="Jugar de nuevo" icono="🔄" onPress={onJugarDeNuevo} estilo={styles.boton} />
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
  titulo: { fontSize: 28, fontWeight: '800' },
  etiqueta: { fontSize: 14, marginTop: 6 },
  palabra: { fontSize: 24, fontWeight: '800', letterSpacing: 2, textAlign: 'center' },
  puntos: { fontSize: 20, fontWeight: '700', marginVertical: 8 },
  boton: { alignSelf: 'stretch', marginTop: 6 },
});

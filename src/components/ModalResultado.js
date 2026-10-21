import { useState } from 'react';
import { Modal, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useApp } from '../context/AppContext';
import Boton from './Boton';

const palabras = (n) => `${n} ${n === 1 ? 'palabra adivinada' : 'palabras adivinadas'}`;
const conSigno = (n) => (n > 0 ? `+${n}` : `${n}`);

// Tablero del final de la partida: puntaje total y cómo le fue a cada palabra.
export default function ModalResultado({ visible, juego, onJugarDeNuevo, onMenu }) {
  const { colores } = useApp();

  // Se guarda lo que se está mostrando para que, mientras el modal se cierra,
  // no aparezcan los datos (ni la palabra) de la partida nueva.
  const [mostrado, setMostrado] = useState(juego);
  if (visible && mostrado !== juego) setMostrado(juego);
  const { puntos, acertadas, historial } = mostrado;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onMenu}>
      <View style={styles.fondo}>
        <View style={[styles.tarjeta, { backgroundColor: colores.superficie }]}>
          <Text style={styles.emoji}>🏁</Text>
          <Text style={[styles.titulo, { color: colores.texto }]}>¡Fin del juego!</Text>
          <Text style={[styles.puntos, { color: colores.texto }]}>⭐ {puntos} puntos</Text>
          <Text style={[styles.detalle, { color: colores.textoSuave }]}>{palabras(acertadas)}</Text>

          <ScrollView style={[styles.tablero, { borderColor: colores.borde }]} contentContainerStyle={styles.filas}>
            {historial.map((p, i) => (
              <View key={i} style={styles.fila}>
                <Text style={[styles.marca, { color: p.gano ? colores.acierto : colores.fallo }]}>{p.gano ? '✓' : '✗'}</Text>
                <Text style={[styles.palabra, { color: colores.texto }]}>{p.palabra}</Text>
                <Text style={[styles.puntosFila, { color: colores.textoSuave }]}>{conSigno(p.puntos)}</Text>
              </View>
            ))}
          </ScrollView>

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
  titulo: { fontSize: 28, fontWeight: '800', textAlign: 'center' },
  puntos: { fontSize: 20, fontWeight: '700', marginTop: 4 },
  detalle: { fontSize: 14, marginBottom: 4 },
  tablero: { alignSelf: 'stretch', maxHeight: 220, borderWidth: 1, borderRadius: 12, marginBottom: 6 },
  filas: { paddingVertical: 8, paddingHorizontal: 12, gap: 6 },
  fila: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  marca: { fontSize: 18, fontWeight: '800', width: 18, textAlign: 'center' },
  palabra: { flex: 1, fontSize: 16, fontWeight: '700' },
  puntosFila: { fontSize: 15, fontWeight: '600' },
  boton: { alignSelf: 'stretch', marginTop: 6 },
});

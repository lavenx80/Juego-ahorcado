import { StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { normalizar } from '../data/palabras';
import { useApp } from '../context/AppContext';

// Un guion por letra; los espacios de las palabras compuestas se ven desde el inicio.
export default function PalabraOculta({ palabra, usadas, terminado }) {
  const { colores } = useApp();
  const { width } = useWindowDimensions();
  const partes = palabra.split(' ');
  const masLarga = Math.max(...partes.map((p) => p.length));
  const celda = Math.min(34, Math.floor((width - 32) / masLarga) - 4);

  return (
    <View style={styles.palabra} accessibilityLabel="Palabra oculta">
      {partes.map((parte, i) => (
        <View key={i} style={styles.parte}>
          {[...parte].map((letra, j) => {
            const descubierta = usadas[normalizar(letra)] === 'acierto';
            return (
              <View key={j} style={[styles.celda, { width: celda, borderBottomColor: colores.texto }]}>
                <Text style={[styles.letra, { fontSize: celda * 0.72, color: descubierta ? colores.texto : colores.fallo }]}>
                  {descubierta || terminado ? letra : ' '}
                </Text>
              </View>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  palabra: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', columnGap: 20, rowGap: 10 },
  parte: { flexDirection: 'row', gap: 4 },
  celda: { alignItems: 'center', borderBottomWidth: 3, paddingBottom: 2 },
  letra: { fontWeight: '800' },
});

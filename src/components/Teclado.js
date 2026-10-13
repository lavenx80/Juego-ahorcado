import { Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';
import { useApp } from '../context/AppContext';

// 27 letras (A-Z con Ñ) en 4 filas de 7 para que quepa sin desplazarse.
const FILAS = ['ABCDEFG', 'HIJKLMN', 'ÑOPQRST', 'UVWXYZ'];
const ESPACIO = 4;

export default function Teclado({ usadas, onLetra, deshabilitado }) {
  const { colores } = useApp();
  const { width } = useWindowDimensions();
  const ancho = Math.min(54, Math.floor((width - 16 - ESPACIO * 6) / 7));

  const fondo = (estado) =>
    estado === 'acierto' ? colores.acierto : estado === 'fallo' ? colores.fallo : deshabilitado ? colores.deshabilitado : colores.tecla;

  return (
    <View style={styles.teclado}>
      {FILAS.map((fila) => (
        <View key={fila} style={styles.fila}>
          {[...fila].map((letra) => {
            const estado = usadas[letra];
            return (
              <Pressable
                key={letra}
                accessibilityLabel={`Letra ${letra}`}
                disabled={Boolean(estado) || deshabilitado}
                onPress={() => onLetra(letra)}
                hitSlop={ESPACIO / 2}
                style={({ pressed }) => [
                  styles.tecla,
                  { width: ancho, backgroundColor: fondo(estado), borderColor: colores.borde, opacity: pressed ? 0.6 : 1 },
                ]}
              >
                <Text style={[styles.letra, { color: estado ? colores.blanco : colores.teclaTexto }]}>{letra}</Text>
              </Pressable>
            );
          })}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  teclado: { gap: 6 },
  fila: { flexDirection: 'row', justifyContent: 'center', gap: ESPACIO },
  tecla: { height: 50, borderRadius: 10, borderWidth: 1, alignItems: 'center', justifyContent: 'center' },
  letra: { fontSize: 20, fontWeight: '700' },
});

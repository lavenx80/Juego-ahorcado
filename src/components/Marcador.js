import { StyleSheet, Text, View } from 'react-native';
import { useApp } from '../context/AppContext';

const formatoTiempo = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

// Corazones de la partida: rojos los que quedan y grises los perdidos.
export function Corazones({ vidas, total, tamano = 22 }) {
  const { colores } = useApp();
  return (
    <Text style={{ fontSize: tamano, letterSpacing: 2 }} accessibilityLabel={`${vidas} de ${total} vidas`}>
      <Text style={{ color: colores.fallo }}>{'♥'.repeat(vidas)}</Text>
      <Text style={{ color: colores.deshabilitado }}>{'♥'.repeat(total - vidas)}</Text>
    </Text>
  );
}

// Categoría, número de palabra, vidas, puntaje y cronómetro de la partida.
export default function Marcador({ categoria, nivel, ronda, vidas, maxVidas, puntos, tiempo }) {
  const { colores } = useApp();
  const texto = [styles.dato, { color: colores.texto }];

  return (
    <View style={[styles.marcador, { backgroundColor: colores.superficie, borderColor: colores.borde }]}>
      <Text style={[styles.categoria, { color: colores.textoSuave }]}>
        {categoria.icono} {categoria.nombre} · {nivel.nombre} · Palabra {ronda}
      </Text>
      <View style={styles.fila}>
        <Corazones vidas={vidas} total={maxVidas} />
        <Text style={texto}>⭐ {puntos}</Text>
        {tiempo !== null && (
          <Text style={[texto, tiempo <= 15 && { color: colores.fallo }]}>⏱ {formatoTiempo(tiempo)}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  marcador: { borderWidth: 1, borderRadius: 14, paddingVertical: 8, paddingHorizontal: 14, gap: 4 },
  categoria: { fontSize: 14, fontWeight: '600', textAlign: 'center' },
  fila: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  dato: { fontSize: 18, fontWeight: '700' },
});

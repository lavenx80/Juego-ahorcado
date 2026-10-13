import { StyleSheet, Text, View } from 'react-native';
import { useApp } from '../context/AppContext';

const formatoTiempo = (s) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

// Categoría, vidas, puntaje y cronómetro de la partida.
export default function Marcador({ categoria, nivel, vidas, maxVidas, puntos, tiempo }) {
  const { colores } = useApp();
  const texto = [styles.dato, { color: colores.texto }];

  return (
    <View style={[styles.marcador, { backgroundColor: colores.superficie, borderColor: colores.borde }]}>
      <Text style={[styles.categoria, { color: colores.textoSuave }]}>
        {categoria.icono} {categoria.nombre} · {nivel.nombre}
      </Text>
      <View style={styles.fila}>
        <Text style={texto} accessibilityLabel={`${vidas} vidas`}>
          <Text style={{ color: colores.fallo }}>{'♥'.repeat(vidas)}</Text>
          <Text style={{ color: colores.deshabilitado }}>{'♥'.repeat(maxVidas - vidas)}</Text>
        </Text>
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

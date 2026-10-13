import { FlatList, StyleSheet, Text, View } from 'react-native';
import Pantalla from '../components/Pantalla';
import { useApp } from '../context/AppContext';

export default function EstadisticasScreen() {
  const { estadisticas: e, colores } = useApp();
  const porcentaje = e.jugadas ? Math.round((e.ganadas / e.jugadas) * 100) : 0;
  const tarjetas = [
    { icono: '🎮', valor: e.jugadas, titulo: 'Partidas jugadas' },
    { icono: '🏆', valor: e.ganadas, titulo: 'Partidas ganadas' },
    { icono: '📈', valor: `${porcentaje}%`, titulo: 'Victorias' },
    { icono: '🔥', valor: e.mejorRacha, titulo: 'Mejor racha' },
  ];
  const caja = { backgroundColor: colores.superficie, borderColor: colores.borde };

  const encabezado = (
    <View style={styles.encabezado}>
      <View style={styles.grid}>
        {tarjetas.map((t) => (
          <View key={t.titulo} style={[styles.tarjeta, caja]}>
            <Text style={styles.icono}>{t.icono}</Text>
            <Text style={[styles.valor, { color: colores.texto }]}>{t.valor}</Text>
            <Text style={[styles.etiqueta, { color: colores.textoSuave }]}>{t.titulo}</Text>
          </View>
        ))}
      </View>
      <Text style={[styles.etiqueta, { color: colores.textoSuave }]}>Racha actual: {e.racha} 🔥</Text>
      <Text style={[styles.titulo, { color: colores.texto }]}>Top 10 de puntajes</Text>
    </View>
  );

  return (
    <Pantalla estilo={styles.sinPadding}>
      <FlatList
        data={e.puntajes}
        keyExtractor={(p) => String(p.fecha)}
        contentContainerStyle={styles.lista}
        ListHeaderComponent={encabezado}
        ListEmptyComponent={
          <Text style={[styles.vacio, { color: colores.textoSuave }]}>Aún no hay puntajes. ¡Juega una partida!</Text>
        }
        renderItem={({ item, index }) => (
          <View style={[styles.fila, caja]}>
            <Text style={[styles.posicion, { color: index < 3 ? colores.boton : colores.textoSuave }]}>#{index + 1}</Text>
            <View style={styles.flex}>
              <Text style={[styles.jugador, { color: colores.texto }]}>{item.jugador}</Text>
              <Text style={[styles.etiqueta, { color: colores.textoSuave }]}>
                {item.palabra} · {item.categoria} · {item.nivel}
              </Text>
            </View>
            <Text style={[styles.puntos, { color: colores.acierto }]}>{item.puntos}</Text>
          </View>
        )}
      />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  sinPadding: { padding: 0 },
  flex: { flex: 1 },
  lista: { padding: 16, gap: 8 },
  encabezado: { gap: 12, marginBottom: 4 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  tarjeta: { flexGrow: 1, flexBasis: '45%', borderWidth: 1, borderRadius: 16, padding: 14, alignItems: 'center' },
  icono: { fontSize: 26 },
  valor: { fontSize: 28, fontWeight: '800' },
  etiqueta: { fontSize: 14 },
  titulo: { fontSize: 20, fontWeight: '800', marginTop: 8 },
  vacio: { fontSize: 15, textAlign: 'center', marginTop: 16 },
  fila: { flexDirection: 'row', alignItems: 'center', gap: 12, borderWidth: 1, borderRadius: 12, padding: 12 },
  posicion: { fontSize: 18, fontWeight: '800', width: 36 },
  jugador: { fontSize: 16, fontWeight: '700' },
  puntos: { fontSize: 20, fontWeight: '800' },
});

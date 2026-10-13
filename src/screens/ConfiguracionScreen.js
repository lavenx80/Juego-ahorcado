import { StyleSheet, Switch, Text, View } from 'react-native';
import Boton from '../components/Boton';
import Pantalla from '../components/Pantalla';
import { useApp } from '../context/AppContext';
import confirmar from '../utils/confirmar';

export default function ConfiguracionScreen() {
  const { config, colores, actualizarConfig, borrarEstadisticas } = useApp();
  const opciones = [
    { icono: '🔊', titulo: 'Sonido', detalle: 'Efectos al acertar, fallar, ganar y perder', valor: config.sonido, cambiar: (v) => actualizarConfig({ sonido: v }) },
    { icono: '📳', titulo: 'Vibración', detalle: 'Vibrar al tocar una letra', valor: config.vibracion, cambiar: (v) => actualizarConfig({ vibracion: v }) },
    { icono: '🌙', titulo: 'Tema oscuro', detalle: 'Colores oscuros para jugar de noche', valor: config.tema === 'oscuro', cambiar: (v) => actualizarConfig({ tema: v ? 'oscuro' : 'claro' }) },
  ];

  const pedirBorrado = () =>
    confirmar('¿Borrar estadísticas?', 'Se eliminarán las partidas, rachas y el top 10 de puntajes.', 'Borrar', borrarEstadisticas);

  return (
    <Pantalla scroll>
      {opciones.map((o) => (
        <View key={o.titulo} style={[styles.fila, { backgroundColor: colores.superficie, borderColor: colores.borde }]}>
          <Text style={styles.icono}>{o.icono}</Text>
          <View style={styles.flex}>
            <Text style={[styles.titulo, { color: colores.texto }]}>{o.titulo}</Text>
            <Text style={[styles.detalle, { color: colores.textoSuave }]}>{o.detalle}</Text>
          </View>
          <Switch
            value={o.valor}
            onValueChange={o.cambiar}
            accessibilityLabel={o.titulo}
            trackColor={{ true: colores.boton, false: colores.deshabilitado }}
            thumbColor={colores.blanco}
          />
        </View>
      ))}
      <Boton titulo="Borrar estadísticas" icono="🗑️" variante="peligro" onPress={pedirBorrado} estilo={styles.borrar} />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  fila: { flexDirection: 'row', alignItems: 'center', gap: 12, minHeight: 64, borderWidth: 1, borderRadius: 14, padding: 14 },
  icono: { fontSize: 24 },
  titulo: { fontSize: 17, fontWeight: '700' },
  detalle: { fontSize: 14 },
  borrar: { marginTop: 12 },
});

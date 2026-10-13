import { Pressable, StyleSheet, Text } from 'react-native';
import { useApp } from '../context/AppContext';

// Botón reutilizable. Variantes: 'primario', 'secundario' y 'peligro'.
export default function Boton({ titulo, icono, onPress, variante = 'primario', deshabilitado = false, estilo }) {
  const { colores } = useApp();
  const fondo = { primario: colores.boton, secundario: colores.superficie, peligro: colores.fallo }[variante];
  const texto = variante === 'secundario' ? colores.texto : colores.blanco;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={deshabilitado}
      style={({ pressed }) => [
        styles.boton,
        { backgroundColor: fondo, borderColor: variante === 'secundario' ? colores.borde : fondo },
        { opacity: deshabilitado ? 0.45 : pressed ? 0.75 : 1 },
        estilo,
      ]}
    >
      <Text style={[styles.texto, { color: texto }]}>{icono ? `${icono}  ${titulo}` : titulo}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  boton: {
    minHeight: 52,
    paddingHorizontal: 20,
    borderRadius: 14,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: { fontSize: 17, fontWeight: '700' },
});

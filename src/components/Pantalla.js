import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useApp } from '../context/AppContext';

// Contenedor base de cada pantalla: respeta las áreas seguras y aplica el fondo del tema.
export default function Pantalla({ children, scroll = false, fondo, edges = ['bottom'], estilo }) {
  const { colores } = useApp();

  return (
    <SafeAreaView edges={edges} style={[styles.flex, { backgroundColor: fondo ?? colores.fondo }]}>
      {scroll ? (
        <ScrollView contentContainerStyle={[styles.contenido, estilo]} keyboardShouldPersistTaps="handled">
          {children}
        </ScrollView>
      ) : (
        <View style={[styles.flex, styles.contenido, estilo]}>{children}</View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  contenido: { padding: 16, gap: 12 },
});

import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import { temas } from '../theme/colores';

// Logo y nombre de la app mientras se cargan la configuración y las estadísticas.
export default function SplashScreen() {
  return (
    <View style={styles.contenedor}>
      <Image source={require('../../assets/splash.png')} style={styles.logo} accessibilityLabel="El Ahorcado" />
      <ActivityIndicator size="large" color={temas.claro.fondo} />
      <Text style={styles.pie}>Programación Móvil · Uniciencia</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  contenedor: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: temas.claro.primario, gap: 24 },
  logo: { width: 260, height: 260 },
  pie: { position: 'absolute', bottom: 48, color: temas.claro.fondo, fontSize: 14, opacity: 0.8 },
});

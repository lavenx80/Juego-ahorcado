import { StatusBar } from 'expo-status-bar';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider, useApp } from './src/context/AppContext';
import AppNavigator from './src/navigation/AppNavigator';
import SplashScreen from './src/screens/SplashScreen';

function Raiz() {
  const { listo, config, colores } = useApp();
  if (!listo) return <SplashScreen />;

  const base = config.tema === 'oscuro' ? DarkTheme : DefaultTheme;
  const tema = {
    ...base,
    colors: { ...base.colors, primary: colores.boton, background: colores.fondo, card: colores.encabezado, text: colores.texto, border: colores.borde },
  };

  return (
    <NavigationContainer theme={tema}>
      <AppNavigator />
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <StatusBar style="light" />
        <Raiz />
      </AppProvider>
    </SafeAreaProvider>
  );
}

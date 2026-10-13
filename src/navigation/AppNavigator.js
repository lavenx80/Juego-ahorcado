import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useApp } from '../context/AppContext';
import CategoriaScreen from '../screens/CategoriaScreen';
import ConfiguracionScreen from '../screens/ConfiguracionScreen';
import EstadisticasScreen from '../screens/EstadisticasScreen';
import InicioScreen from '../screens/InicioScreen';
import InstruccionesScreen from '../screens/InstruccionesScreen';
import JuegoScreen from '../screens/JuegoScreen';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { colores } = useApp();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colores.encabezado },
        headerTintColor: colores.blanco,
        headerTitleStyle: { fontWeight: '700' },
        contentStyle: { backgroundColor: colores.fondo },
      }}
    >
      <Stack.Screen name="Inicio" component={InicioScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Instrucciones" component={InstruccionesScreen} />
      <Stack.Screen name="Categoria" component={CategoriaScreen} options={{ title: 'Categoría y nivel' }} />
      <Stack.Screen name="Juego" component={JuegoScreen} options={{ title: 'El Ahorcado', gestureEnabled: false }} />
      <Stack.Screen name="Estadisticas" component={EstadisticasScreen} options={{ title: 'Estadísticas' }} />
      <Stack.Screen name="Configuracion" component={ConfiguracionScreen} options={{ title: 'Configuración' }} />
    </Stack.Navigator>
  );
}

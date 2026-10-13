import { Alert, Platform } from 'react-native';

// Pide confirmación antes de una acción (Alert en el celular, window.confirm en la web).
export default function confirmar(titulo, mensaje, textoAceptar, alAceptar) {
  if (Platform.OS === 'web') {
    if (window.confirm(`${titulo}\n\n${mensaje}`)) alAceptar();
    return;
  }
  Alert.alert(titulo, mensaje, [
    { text: 'Cancelar', style: 'cancel' },
    { text: textoAceptar, style: 'destructive', onPress: alAceptar },
  ]);
}

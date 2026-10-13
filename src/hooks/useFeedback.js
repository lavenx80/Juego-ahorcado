import * as Haptics from 'expo-haptics';
import { useAudioPlayer } from 'expo-audio';
import { useApp } from '../context/AppContext';

const VIBRACIONES = {
  acierto: () => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light),
  error: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error),
  victoria: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success),
  derrota: () => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning),
};

// Devuelve una función que vibra y/o suena según la configuración del jugador.
export default function useFeedback() {
  const { config } = useApp();
  const sonidos = {
    acierto: useAudioPlayer(require('../../assets/sonidos/acierto.wav')),
    error: useAudioPlayer(require('../../assets/sonidos/error.wav')),
    victoria: useAudioPlayer(require('../../assets/sonidos/victoria.wav')),
    derrota: useAudioPlayer(require('../../assets/sonidos/derrota.wav')),
  };

  return (tipo) => {
    if (config.vibracion) VIBRACIONES[tipo]().catch(() => {});
    if (config.sonido) {
      const sonido = sonidos[tipo];
      sonido.seekTo(0).then(() => sonido.play()).catch(() => {});
    }
  };
}

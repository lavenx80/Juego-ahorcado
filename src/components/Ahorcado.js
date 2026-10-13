import Svg, { Circle, G, Line, Path } from 'react-native-svg';
import { useApp } from '../context/AppContext';

// Una parte del cuerpo por cada error, en este orden.
const PARTES = [
  <Circle key="cabeza" cx="150" cy="70" r="22" />,
  <Line key="cuerpo" x1="150" y1="92" x2="150" y2="150" />,
  <Line key="brazoIzquierdo" x1="150" y1="106" x2="122" y2="134" />,
  <Line key="brazoDerecho" x1="150" y1="106" x2="178" y2="134" />,
  <Line key="piernaIzquierda" x1="150" y1="150" x2="126" y2="190" />,
  <Line key="piernaDerecha" x1="150" y1="150" x2="174" y2="190" />,
];

export default function Ahorcado({ errores, perdio, tamano = 200 }) {
  const { colores } = useApp();

  return (
    <Svg width={tamano} height={tamano} viewBox="0 0 220 220">
      <G fill="none" strokeLinecap="round" strokeLinejoin="round">
        <Path d="M25 208 H125 M60 208 V18 H150 M60 55 L97 18" stroke={colores.textoSuave} strokeWidth={9} />
        <Line x1="150" y1="18" x2="150" y2="48" stroke={colores.fallo} strokeWidth={5} />
        <G stroke={colores.texto} strokeWidth={6}>{PARTES.slice(0, errores)}</G>
        {perdio && <Path d="M140 64 l6 6 m0 -6 l-6 6 M154 64 l6 6 m0 -6 l-6 6" stroke={colores.fallo} strokeWidth={3} />}
      </G>
    </Svg>
  );
}

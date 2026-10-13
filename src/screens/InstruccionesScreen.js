import { StyleSheet, Text, View } from 'react-native';
import Pantalla from '../components/Pantalla';
import { useApp } from '../context/AppContext';
import { NIVELES } from '../data/palabras';

const REGLAS = [
  'Escribe tu nombre, elige una categoría y un nivel de dificultad.',
  'La palabra aparece oculta con un guion por letra. En palabras compuestas los espacios se ven desde el inicio.',
  'Toca una letra del teclado. Cada letra se usa una sola vez: se pinta de verde si está y de rojo si no.',
  'Si aciertas, la letra se revela en todas sus posiciones. Si fallas, se dibuja una parte del ahorcado.',
  'Las tildes no cuentan: la «O» también revela la «Ó». La «Ñ» sí es una letra distinta.',
  'Ganas si descubres la palabra antes de 6 errores. Pierdes con 6 errores o si se acaba el tiempo (nivel Difícil).',
];

const PUNTUACION = [
  '+10 puntos por cada letra revelada.',
  'Al ganar: bono de 50 puntos + 10 por cada vida que te quede.',
  'Los puntos de letras y bono se multiplican según el nivel.',
  'En Difícil, cada segundo sobrante suma 1 punto.',
  'Cada pista revela una letra al azar, pero descuenta puntos.',
];

function Seccion({ titulo, items, colores }) {
  return (
    <View style={[styles.seccion, { backgroundColor: colores.superficie, borderColor: colores.borde }]}>
      <Text style={[styles.titulo, { color: colores.texto }]}>{titulo}</Text>
      {items.map((texto, i) => (
        <Text key={i} style={[styles.item, { color: colores.texto }]}>
          <Text style={{ color: colores.boton, fontWeight: '800' }}>{i + 1}. </Text>
          {texto}
        </Text>
      ))}
    </View>
  );
}

export default function InstruccionesScreen() {
  const { colores } = useApp();
  const niveles = NIVELES.map(
    (n) =>
      `${n.nombre}: puntos ×${n.multiplicador}, ${n.pistas} pista(s) de −${n.costoPista} pts` +
      (n.tiempo ? `, ${n.tiempo} segundos para adivinar.` : ', sin límite de tiempo.'),
  );

  return (
    <Pantalla scroll>
      <Seccion titulo="📖 Cómo jugar" items={REGLAS} colores={colores} />
      <Seccion titulo="🎯 Niveles" items={niveles} colores={colores} />
      <Seccion titulo="⭐ Puntuación" items={PUNTUACION} colores={colores} />
    </Pantalla>
  );
}

const styles = StyleSheet.create({
  seccion: { borderWidth: 1, borderRadius: 16, padding: 16, gap: 8 },
  titulo: { fontSize: 20, fontWeight: '800', marginBottom: 4 },
  item: { fontSize: 15, lineHeight: 22 },
});

// Banco de palabras por categoría y nivel, y configuración de los niveles.

export const CATEGORIAS = [
  {
    id: 'capitales',
    nombre: 'Capitales de Colombia',
    icono: '🏛️',
    palabras: {
      facil: ['CALI', 'MITÚ', 'PASTO', 'TUNJA', 'NEIVA', 'YOPAL', 'MOCOA', 'BOGOTÁ', 'ARAUCA', 'IBAGUÉ', 'QUIBDÓ'],
      medio: ['MEDELLÍN', 'CÚCUTA', 'PEREIRA', 'ARMENIA', 'MONTERÍA', 'POPAYÁN', 'LETICIA', 'RIOHACHA', 'CARTAGENA', 'MANIZALES', 'SINCELEJO', 'FLORENCIA', 'INÍRIDA'],
      dificil: ['BARRANQUILLA', 'BUCARAMANGA', 'VILLAVICENCIO', 'VALLEDUPAR', 'SANTA MARTA', 'SAN ANDRÉS', 'PUERTO CARREÑO', 'SAN JOSÉ DEL GUAVIARE'],
    },
  },
  {
    id: 'animales',
    nombre: 'Animales de Colombia',
    icono: '🐆',
    palabras: {
      facil: ['OSO', 'BOA', 'PUMA', 'LORO', 'MONO', 'DANTA', 'TUCÁN', 'GARZA', 'BÚHO'],
      medio: ['CÓNDOR', 'JAGUAR', 'CAIMÁN', 'CHIGÜIRO', 'TORTUGA', 'PEREZOSO', 'GUACAMAYA', 'ARMADILLO', 'MANATÍ', 'OCELOTE', 'IGUANA'],
      dificil: ['OSO DE ANTEOJOS', 'DELFÍN ROSADO', 'MONO AULLADOR', 'RANA DORADA', 'OSO HORMIGUERO', 'ÁGUILA ARPÍA', 'TIBURÓN MARTILLO'],
    },
  },
  {
    id: 'frutas',
    nombre: 'Frutas',
    icono: '🍍',
    palabras: {
      facil: ['UVA', 'PERA', 'PIÑA', 'COCO', 'MORA', 'LULO', 'KIWI', 'MANGO', 'FRESA'],
      medio: ['BANANO', 'GUAYABA', 'PAPAYA', 'MARACUYÁ', 'NARANJA', 'MANZANA', 'MANDARINA', 'PITAHAYA', 'CURUBA', 'UCHUVA', 'BOROJÓ', 'GULUPA'],
      dificil: ['TOMATE DE ÁRBOL', 'CHONTADURO', 'GRANADILLA', 'GUANÁBANA', 'CARAMBOLO', 'MANGOSTINO', 'MAMONCILLO'],
    },
  },
  {
    id: 'comidas',
    nombre: 'Comidas típicas',
    icono: '🍲',
    palabras: {
      facil: ['AREPA', 'TAMAL', 'MUTE', 'OBLEA', 'CHICHA', 'PATACÓN'],
      medio: ['AJIACO', 'SANCOCHO', 'LECHONA', 'EMPANADA', 'BUÑUELO', 'PANDEBONO', 'CHANGUA', 'MAZAMORRA', 'ALMOJÁBANA'],
      dificil: ['BANDEJA PAISA', 'ARROZ CON COCO', 'POSTA NEGRA', 'MOTE DE QUESO', 'SOBREBARRIGA', 'CAZUELA DE MARISCOS'],
    },
  },
];

export const ALEATORIA = { id: 'aleatoria', nombre: 'Aleatoria', icono: '🎲' };

export const NIVELES = [
  { id: 'facil', nombre: 'Fácil', multiplicador: 1, pistas: 3, costoPista: 10, tiempo: null, descripcion: 'Palabras cortas · 3 pistas' },
  { id: 'medio', nombre: 'Medio', multiplicador: 2, pistas: 2, costoPista: 20, tiempo: null, descripcion: 'Palabras medianas · 2 pistas · puntos ×2' },
  { id: 'dificil', nombre: 'Difícil', multiplicador: 3, pistas: 1, costoPista: 30, tiempo: 90, descripcion: 'Palabras largas · 1 pista · 90 s · puntos ×3' },
];

export const azar = (lista) => lista[Math.floor(Math.random() * lista.length)];

// Las tildes no cuentan («O» = «Ó», «U» = «Ü»), pero la «Ñ» es una letra distinta.
export const normalizar = (letra) => (letra === 'Ñ' ? letra : letra.normalize('NFD')[0]);

// Letras distintas (ya normalizadas) que hay que descubrir en la palabra.
export const letrasDe = (palabra) => new Set([...palabra.replace(/ /g, '')].map(normalizar));

// Devuelve { palabra, categoria } evitando repetir la palabra anterior.
export function elegirPalabra(categoriaId, nivelId, anterior) {
  const categoria = categoriaId === ALEATORIA.id ? azar(CATEGORIAS) : CATEGORIAS.find((c) => c.id === categoriaId);
  const opciones = categoria.palabras[nivelId].filter((p) => p !== anterior);
  return { palabra: azar(opciones), categoria };
}

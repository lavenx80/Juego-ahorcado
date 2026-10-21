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
      facil: ['OSO', 'BOA', 'PUMA', 'LORO', 'SAPO', 'BÚHO', 'DANTA', 'TUCÁN', 'GARZA', 'COATÍ', 'ÑEQUE', 'BAGRE', 'VENADO'],
      medio: [
        'CÓNDOR', 'JAGUAR', 'CAIMÁN', 'CHIGÜIRO', 'TORTUGA', 'PEREZOSO', 'GUACAMAYA', 'ARMADILLO',
        'MANATÍ', 'OCELOTE', 'IGUANA', 'COLIBRÍ', 'TIGRILLO', 'BABILLA', 'NUTRIA',
      ],
      dificil: [
        'OSO DE ANTEOJOS', 'DELFÍN ROSADO', 'MONO AULLADOR', 'RANA DORADA', 'ÁGUILA ARPÍA', 'TIBURÓN MARTILLO',
        'GALLITO DE ROCA', 'BALLENA JOROBADA', 'HORMIGA CULONA', 'MURCIÉLAGO', 'TITÍ CABECIBLANCO',
      ],
    },
  },
  {
    id: 'frutas',
    nombre: 'Frutas',
    icono: '🍍',
    palabras: {
      facil: ['UVA', 'PERA', 'PIÑA', 'COCO', 'MORA', 'LULO', 'KIWI', 'MANGO', 'FRESA', 'MAMEY', 'GUAMA', 'ARAZÁ', 'LIMÓN'],
      medio: [
        'BANANO', 'GUAYABA', 'PAPAYA', 'MARACUYÁ', 'NARANJA', 'MANZANA', 'PITAHAYA', 'CURUBA', 'UCHUVA',
        'BOROJÓ', 'GULUPA', 'AGUACATE', 'ZAPOTE', 'CAIMITO', 'CIRUELA', 'FEIJOA', 'SANDÍA',
      ],
      dificil: [
        'TOMATE DE ÁRBOL', 'CHONTADURO', 'GRANADILLA', 'GUANÁBANA', 'CARAMBOLO', 'MANGOSTINO', 'MAMONCILLO',
        'TAMARINDO', 'MELOCOTÓN', 'ALBARICOQUE',
      ],
    },
  },
  {
    id: 'comidas',
    nombre: 'Comidas típicas',
    icono: '🍲',
    palabras: {
      facil: ['AREPA', 'TAMAL', 'MUTE', 'OBLEA', 'CHICHA', 'PATACÓN', 'BOLLO', 'TINTO', 'AVENA', 'PANELA', 'LULADA', 'CHORIZO'],
      medio: [
        'AJIACO', 'SANCOCHO', 'LECHONA', 'EMPANADA', 'BUÑUELO', 'PANDEBONO', 'CHANGUA', 'MAZAMORRA',
        'ALMOJÁBANA', 'CUCHUCO', 'MONDONGO', 'CALENTADO', 'NATILLA', 'SALPICÓN', 'CUAJADA',
      ],
      dificil: [
        'BANDEJA PAISA', 'ARROZ CON COCO', 'POSTA NEGRA', 'MOTE DE QUESO', 'SOBREBARRIGA', 'CAZUELA DE MARISCOS',
        'PESCADO FRITO', 'LENGUA EN SALSA', 'CHUNCHULLO', 'CHICHARRÓN', 'ENVUELTO DE MAZORCA',
      ],
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

// Palabras que ya salieron mientras la app está abierta. No se repiten hasta que salgan todas las de la lista.
const yaSalieron = new Set();

// Primeras 3 letras sin tildes: OSO / OSO DE ANTEOJOS o SAN ANDRÉS / SANTA MARTA empiezan igual.
const inicio = (palabra) => [...palabra.slice(0, 3)].map(normalizar).join('');

// Devuelve { palabra, categoria } sin repetir palabras y evitando una que empiece igual que la anterior.
export function elegirPalabra(categoriaId, nivelId, anterior = '') {
  const categorias = categoriaId === ALEATORIA.id ? CATEGORIAS : CATEGORIAS.filter((c) => c.id === categoriaId);
  const todas = categorias.flatMap((categoria) => categoria.palabras[nivelId].map((palabra) => ({ palabra, categoria })));

  let nuevas = todas.filter((o) => !yaSalieron.has(o.palabra));
  if (nuevas.length === 0) {
    // Ya salieron todas: la lista vuelve a empezar, sin repetir la anterior.
    todas.forEach((o) => yaSalieron.delete(o.palabra));
    nuevas = todas.filter((o) => o.palabra !== anterior);
  }
  const distintas = nuevas.filter((o) => inicio(o.palabra) !== inicio(anterior));
  const elegida = azar(distintas.length ? distintas : nuevas);
  yaSalieron.add(elegida.palabra);
  return elegida;
}

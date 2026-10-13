// Paleta de la guía de estilos (docs/diseno/guia-de-estilos.md)
const marca = {
  primario: '#1F3864', // azul oscuro: fondos y encabezados
  boton: '#2E74B5', // azul: botones
  acierto: '#2E9E5B', // verde: letras acertadas
  fallo: '#D64545', // rojo: letras falladas
  blanco: '#FFFFFF',
};

export const temas = {
  claro: {
    ...marca,
    fondo: '#F2F2F2',
    superficie: '#FFFFFF',
    encabezado: '#1F3864',
    texto: '#1A1F2B',
    textoSuave: '#5B6475',
    borde: '#D5DBE5',
    tecla: '#FFFFFF',
    teclaTexto: '#1F3864',
    deshabilitado: '#C4CAD4',
  },
  oscuro: {
    ...marca,
    fondo: '#0E1726',
    superficie: '#1A2740',
    encabezado: '#0A111D',
    texto: '#F2F2F2',
    textoSuave: '#A9B4C8',
    borde: '#2C3B57',
    tecla: '#24365A',
    teclaTexto: '#F2F2F2',
    deshabilitado: '#3A4560',
  },
};

export const tipografia = { titulo: 28, subtitulo: 20, cuerpo: 16, pequeno: 14 };

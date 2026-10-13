# Guía de estilos — El Ahorcado Móvil

Referencia para los mockups de Figma/MockFlow. Los valores son los mismos de `src/theme/colores.js`.
Marco de celular de referencia: **393 × 852** (orientación vertical).

## Paleta de colores

| Uso | Claro | Oscuro |
| --- | --- | --- |
| Encabezados / fondo de Inicio | `#1F3864` | `#0A111D` |
| Fondo de pantalla | `#F2F2F2` | `#0E1726` |
| Superficies (tarjetas, campos) | `#FFFFFF` | `#1A2740` |
| Botón principal | `#2E74B5` | `#2E74B5` |
| Letra acertada | `#2E9E5B` | `#2E9E5B` |
| Letra fallada / error | `#D64545` | `#D64545` |
| Texto | `#1A1F2B` | `#F2F2F2` |
| Texto secundario | `#5B6475` | `#A9B4C8` |
| Bordes | `#D5DBE5` | `#2C3B57` |
| Tecla deshabilitada | `#C4CAD4` | `#3A4560` |

## Tipografía

Fuente del sistema (Roboto en Android). Ningún texto mide menos de **14 sp**.

| Estilo | Tamaño | Peso |
| --- | --- | --- |
| Título de Inicio | 32 sp | 800 |
| Título del modal | 28 sp | 800 |
| Título de sección | 18 a 20 sp | 700 a 800 |
| Botones | 17 sp | 700 |
| Teclas | 20 sp | 700 |
| Cuerpo | 15 a 16 sp | 400 |
| Texto secundario | 14 sp | 400 a 600 |

## Estados de las teclas

| Estado | Fondo | Texto |
| --- | --- | --- |
| Disponible | Superficie (`#FFFFFF` / `#24365A`) | `#1F3864` / `#F2F2F2` |
| Acertada | `#2E9E5B` | Blanco |
| Fallada | `#D64545` | Blanco |
| Deshabilitada (fin de partida) | `#C4CAD4` / `#3A4560` | Igual al de disponible |

## Componentes

- **Áreas táctiles de 48 × 48 dp como mínimo.** Los botones miden 52 dp de alto. Las teclas miden 50 dp de alto y
  su área táctil se amplía con `hitSlop` para llegar a 48 dp de ancho en pantallas de 360 dp.
- **Teclado:** 27 letras (A–Z con Ñ) en 4 filas de 7. Cabe completo en pantallas pequeñas sin desplazarse.
- **Bordes redondeados:** 10 dp en teclas, 12 a 14 dp en botones y campos, 16 a 20 dp en tarjetas y en el modal.
- **Espaciado:** 16 dp de margen lateral y 8 a 12 dp entre elementos.

## Ícono y splash

- `icono.svg` / `icono.png`: horca y figura en blanco, con la cuerda en rojo, sobre un degradado de `#2E74B5` a `#1F3864`.
- `splash.svg` / `splash.png`: el mismo dibujo con el nombre «AHORCADO» sobre `#1F3864`.

## Mockups

La carpeta `mockups/` tiene capturas de cada pantalla de la app (393 × 852) en tema claro y oscuro.
Puedes importarlas en Figma como base de los mockups de alta fidelidad y del prototipo navegable.

# Diseño · El Ahorcado Móvil

| Carpeta / archivo | Contenido |
| --- | --- |
| `wireframes/` | Wireframes de baja fidelidad en escala de grises (SVG editable + PNG) |
| `mockups/` | Mockups de alta fidelidad de 393 × 852, en tema claro y oscuro |
| `guia-de-estilos.md` | Paleta, tipografía, estados de las teclas y medidas |
| `icono.svg`, `splash.svg` | Diseño del ícono y de la pantalla de carga |
| `figma-plugin/` | Plugin que arma todo el diseño en Figma, con el prototipo ya conectado |

## Crear el archivo de Figma con el plugin

Los plugins en desarrollo solo funcionan en la **app de escritorio de Figma** (gratis en figma.com/downloads).

1. Abre Figma Desktop, inicia sesión y crea un archivo de diseño nuevo (**+ → Design file**).
2. En el menú, entra a **Plugins → Development → Import plugin from manifest…** y elige `docs/diseno/figma-plugin/manifest.json`.
3. Ejecútalo desde **Plugins → Development → Ahorcado · Diseño y prototipo**.
   Tarda unos segundos y crea 3 páginas:
   - **1. Wireframes**: las 10 pantallas en baja fidelidad.
   - **2. Mockups y prototipo**: las pantallas finales, ya conectadas entre sí.
   - **3. Guía de estilos**: colores (guardados como *color styles*), tipografía (*text styles*), teclas, botones, ícono y splash.
4. En la página **2. Mockups y prototipo**, presiona **▶ Present** para probar el recorrido del jugador.
5. Para entregarlo, usa **Share → Copy link**. En la pestaña *Prototype* puedes copiar también el enlace del prototipo.

## Recorrido del prototipo

Splash (1,5 s) → Inicio → Categoría y nivel → Juego.
Dentro del juego, tocar el teclado lleva al resultado: palabra adivinada (3 vidas) → vida perdida (2) → vida perdida (1) → fin del juego.
Además funcionan los botones Instrucciones, Estadísticas, Configuración, Menú, Jugar de nuevo y la flecha ← de cada pantalla.

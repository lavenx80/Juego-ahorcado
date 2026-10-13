# El Ahorcado Móvil

Juego del ahorcado para Android hecho con **React Native y Expo**. Es el parcial de Programación Móvil de Uniciencia.

Las palabras son de 4 categorías: Capitales de Colombia, Animales de Colombia, Frutas y Comidas típicas.
También hay una opción Aleatoria. Cada partida tiene 3 vidas y varias palabras seguidas.
Hay 3 niveles de dificultad, pistas, cronómetro y estadísticas guardadas en el celular.

## Tecnologías

| Requisito | Implementación |
| --- | --- |
| Navegación | React Navigation (`@react-navigation/native-stack`) |
| Estado del juego | `useReducer` + `useEffect` en el hook `useJuego` |
| Dibujo del ahorcado | `react-native-svg` |
| Almacenamiento local | `@react-native-async-storage/async-storage` |
| Vibración | `expo-haptics` |
| Sonidos | `expo-audio` |
| Splash e ícono | `expo-splash-screen` + `app.json` |
| APK | EAS Build (`eas.json`) |

## Cómo ejecutarlo

```bash
npm install
npx expo start
```

Escanea el código QR con la app **Expo Go** en Android. Para verlo en el navegador, usa `npx expo start --web`.

## Generar el APK

```bash
npm install -g eas-cli
eas login
eas build -p android --profile preview
```

Al terminar, EAS entrega un enlace para descargar el `.apk` e instalarlo en el celular.

## Diseño en Figma

En [docs/diseno](docs/diseno/README.md) están los wireframes, los mockups y la guía de estilos. También hay un plugin que
crea el archivo de Figma completo, con el prototipo navegable ya conectado.

## Reglas del juego

1. El jugador escribe su nombre (no puede quedar vacío) y elige una categoría y un nivel.
2. La palabra se muestra con un guion por letra. En palabras compuestas los espacios se ven desde el inicio.
3. Cada letra del teclado (A–Z con Ñ) se usa una sola vez. Se pinta de verde si acierta y de rojo si falla.
4. Si la letra está, se revela en todas sus posiciones, suma puntos y el celular hace una vibración corta.
5. Si no está, se dibuja una parte del ahorcado (cabeza, cuerpo, brazos y piernas) y el celular vibra con el patrón de error.
6. Las tildes no cuentan: la «O» revela la «Ó». La «Ñ» es una letra distinta.
7. La palabra se adivina si se descubre antes de 6 errores. Con 6 errores o, en Difícil, al acabarse los 90 segundos, no se adivina.
8. Cada partida tiene **3 vidas (♥)**. Cada palabra no adivinada quita una vida y el juego sigue con otra palabra sin reiniciarse.
   Si se adivina, se pasa a la siguiente palabra con los puntos acumulados.
9. La partida termina al perder las 3 vidas. El puntaje total entra al top 10.

| Nivel | Palabras | Pistas | Tiempo | Multiplicador |
| --- | --- | --- | --- | --- |
| Fácil | Cortas | 3 (−10 pts) | Sin límite | ×1 |
| Medio | Medianas | 2 (−20 pts) | Sin límite | ×2 |
| Difícil | Largas o compuestas | 1 (−30 pts) | 90 s | ×3 |

**Puntuación:** cada letra revelada da +10. Al adivinar una palabra hay un bono de 50 más 10 por cada error no usado.
Los puntos de letras y el bono se multiplican según el nivel. En Difícil, cada segundo sobrante suma 1 punto.

## Estructura

```
ahorcado-app/
├── App.js                      → Punto de entrada, proveedor de estado y navegación
├── app.json                    → Nombre, ícono, splash y configuración
├── eas.json                    → Configuración de EAS Build (APK)
├── assets/                     → icon.png, splash.png y sonidos/ (acierto, error, victoria, derrota)
├── src/
│   ├── navigation/AppNavigator.js  → Stack de pantallas
│   ├── screens/                → Splash, Inicio, Instrucciones, Categoría, Juego, Estadísticas, Configuración
│   ├── components/             → Ahorcado, PalabraOculta, Teclado, Marcador, ModalResultado, Boton, Pantalla
│   ├── hooks/                  → useJuego (lógica de la partida) y useFeedback (vibración y sonido)
│   ├── context/AppContext.js   → Configuración y estadísticas globales
│   ├── data/palabras.js        → Banco de palabras, categorías y niveles
│   ├── storage/almacenamiento.js → Funciones con AsyncStorage
│   ├── theme/colores.js        → Paleta clara y oscura
│   └── utils/confirmar.js      → Diálogo de confirmación
└── docs/diseno/                → Wireframes, mockups, guía de estilos, ícono, splash y plugin de Figma
```

## Requerimientos funcionales

| Código | Dónde se cumple |
| --- | --- |
| RF-01 Nombre obligatorio | `InicioScreen.js` |
| RF-02 Categoría y nivel | `CategoriaScreen.js` |
| RF-03 Palabra aleatoria por categoría y nivel | `elegirPalabra` en `data/palabras.js` |
| RF-04 Guiones y espacios visibles | `PalabraOculta.js` |
| RF-05 Teclado A–Z con Ñ | `Teclado.js` |
| RF-06 Validar letra ignorando tildes | `normalizar` en `data/palabras.js` y `aplicarLetra` en `useJuego.js` |
| RF-07 Letras usadas deshabilitadas y coloreadas | `Teclado.js` |
| RF-08 Una parte del dibujo por error | `Ahorcado.js` |
| RF-09 Victoria, derrota y modal (3 vidas por partida) | `useJuego.js` + `ModalResultado.js` |
| RF-10 Puntaje en tiempo real | `Marcador.js` |
| RF-11 Pistas según el nivel | `pedirPista` en `useJuego.js` |
| RF-12 Cronómetro de 90 s en Difícil | `useJuego.js` + `Marcador.js` |
| RF-13 Vibración y sonido según configuración | `useFeedback.js` |
| RF-14 Estadísticas, puntajes y configuración guardados | `almacenamiento.js` + `AppContext.js` |
| RF-15 Confirmar «atrás» en medio de una partida | `usePreventRemove` en `JuegoScreen.js` |

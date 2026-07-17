# Arcania 🔮

Aplicación móvil de tarot construida con [Expo](https://expo.dev) y React Native. Permite explorar los 22 arcanos mayores, ver sus modelos 3D, realizar una tirada de tres cartas y conversar con un asistente sobre cada arcano.

## Funcionalidades

- **Inicio**: pantalla de bienvenida.
- **Arcanos**: cuadrícula con los 22 arcanos mayores; al tocar uno se abre su ficha con modelo 3D, información, correspondencias, mazos y chat.
- **Tirada**: baraja animada de la que el usuario elige 3 cartas y obtiene una lectura.
- **Explorar**: vista paginada de arcanos destacados.

## Stack

- **Expo** ~52 / **React Native** 0.76 / **Expo Router** (file-based routing en `app/`)
- **react-three-fiber** + **drei** para los modelos 3D (`.glb` en `assets/models/`)
- **react-native-reanimated** para las animaciones de la tirada
- **NativeWind** (Tailwind) para estilos utilitarios
- **react-native-gifted-chat** + **axios** para el chat (backend n8n)

## Estructura

```
app/                  Rutas (Expo Router)
  (tabs)/             Pantallas con tab bar: index, arcanos, tirada, explorar
  (tabs)/Card.tsx     Ficha de un arcano (modelo 3D + sub-vistas)
components/           Componentes reutilizables
  vistaArcano/        Sub-vistas de la ficha: Info, Correspondencias, Mazos, Chat
assets/
  data/images.js      Fuente canónica de los 22 arcanos (nombre, descripción, miniatura)
  models/             Modelos 3D .glb
data/
  arcanes.json        Datos de cada arcano (incluye qué modelo 3D usar)
  models.tsx          Mapa de claves de modelo -> archivo .glb
```

## Cómo ejecutar

1. Instalar dependencias:

   ```bash
   npm install
   ```

2. Iniciar el servidor de desarrollo:

   ```bash
   npx expo start
   ```

   Desde ahí puedes abrir la app en un emulador Android, simulador iOS, [Expo Go](https://expo.dev/go) o la web.

## Scripts

| Script | Descripción |
| --- | --- |
| `npm start` | Inicia el bundler de Expo |
| `npm run android` | Abre en emulador/dispositivo Android |
| `npm run ios` | Abre en simulador iOS |
| `npm run web` | Abre en el navegador |
| `npm run lint` | Linting con la config de Expo + Prettier |
| `npm test` | Tests con Jest (jest-expo) |

## Notas

- **Modelos 3D**: por ahora solo existen `.glb` para 5 arcanos (sacerdotisa, ermitaño, muerte, torre, juicio). Los arcanos sin modelo muestran un mensaje de "modelo no disponible" en lugar del visor 3D.
- **Chat**: el endpoint del webhook de n8n está configurado en `components/vistaArcano/Chatscreen.tsx`. Conviene moverlo a una variable de entorno.

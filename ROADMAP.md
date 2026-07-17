# Roadmap — Arcania 🔮

> **Visión**: un santuario de bolsillo donde los 22 arcanos son personajes vivos: los coleccionas, conversas con ellos, te guían con retos de introspección, y tu progreso emocional es la mecánica del juego.
>
> **Loop central**: tirada diaria → conversación con el arcano → micro-reto de reflexión → XP/vínculo → desbloqueos.

---

## Fase 0 — Cimientos 🔧 ✅

- [x] Unificar datos en `data/arcanos.ts` (única fuente tipada: nombre, descripción, palabras clave, correspondencias, modelo 3D, miniatura, personalidad)
- [x] Migrar estado de `ApplicationContext` a **zustand**
- [x] Persistencia con AsyncStorage (zustand `persist`)
- [x] Webhook de n8n a variable de entorno (`EXPO_PUBLIC_N8N_CHAT_URL`)

## Fase 1 — Loop RPG mínimo 🎮

- [x] **Carta del día**: un arcano te recibe al abrir la app, con reto + bendición diaria (+XP, una vez al día)
- [x] **XP y niveles** (Iniciado → Aprendiz → Adepto → Vidente → Oráculo)
- [x] **Racha diaria** (contador; recompensa creciente pendiente)
- [x] **Diario del viajero**: reflexión al final de cada lectura (+XP), historial navegable por fecha/carta
- [x] **Grimorio**: arcanos "dormidos" que se despiertan al encontrarlos; vínculo (1-5⭐) por arcano
- [x] Reorganizar tabs: `Hoy` / `Grimorio` / `Tirada` / `Diario` (Explorar eliminado)
- [ ] Recompensa creciente por racha (multiplicador de XP)
- [ ] Pulido visual: barra de progreso de XP, animación al ganar XP/vínculo

## Fase 2 — Chat con alma 💬

- [ ] Persona por arcano (system prompt desde `arcanos.ts`, inyectado en n8n con `arcanoId` + `sessionId`)
- [ ] Memoria de conversación por sesión en n8n
- [ ] Cliente: manejo de errores visible, indicador de "escribiendo", parseo robusto
- [ ] Vínculo ↔ chat: más vínculo desbloquea capas de diálogo y retos profundos
- [ ] **Guardarraíles de autoayuda** en los prompts (sin consejo médico, tono de acompañamiento, derivación en crisis)

## Fase 3 — Arcanos vivos 🗣️

- [ ] **3a. Reacciones procedurales** (solo código): idle bobbing, acercamiento al hablar, luces/partículas según emoción (el LLM devuelve `{ texto, emocion }`)
- [ ] **3b. Voz**: `expo-speech` primero → ElevenLabs vía n8n después (cachear audios)
- [ ] **3c. Lip-sync**: riggear modelos con shape keys de visemas en Blender (piloto: la Sacerdotisa), boca por amplitud del audio, clips de animación con `useAnimations`

## Fase 4 — RPG mágico completo ✨

- [ ] Misiones semanales narrativas por arcano
- [ ] Economía suave ("polvo de estrellas") → tiradas especiales y cosméticos
- [ ] Tiradas avanzadas desbloqueables (cruz celta, herradura, tirada del año)
- [ ] Rituales de temporada (luna llena, solsticios) con recompensas limitadas
- [ ] Modo historia: el viaje del Loco en capítulos (lore real + narrativa propia)

---

## Deuda técnica pendiente

- [ ] 17 modelos 3D faltantes (mientras tanto: mejorar placeholder a carta 2D con parallax)
- [ ] Quitar dependencias sin uso: `react-native-particles`, `@n8n/chat`, `react-native-animated-flip-card`
- [ ] Refactor de animación de barajado (cadenas de setTimeout → `withSequence`/`withDelay`)
- [ ] Unificar idioma de la UI (español)

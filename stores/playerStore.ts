import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TOTAL_ARCANOS } from "../data/arcanos";

// Progreso del jugador (persistido en el dispositivo).
// Cimiento del loop RPG de la Fase 1: XP, racha, vínculos y diario.

export interface RegistroTirada {
  /** fecha ISO completa del momento de la tirada */
  fecha: string;
  /** números de arcano, en orden de selección */
  cartas: number[];
  /** reflexión del usuario (diario del viajero) */
  nota?: string;
}

export const XP_POR_TIRADA = 25;
export const XP_POR_BENDICION = 10;
export const XP_POR_REFLEXION = 15;

export const NIVELES = [
  { nombre: "Iniciado", xpMinimo: 0 },
  { nombre: "Aprendiz", xpMinimo: 100 },
  { nombre: "Adepto", xpMinimo: 300 },
  { nombre: "Vidente", xpMinimo: 700 },
  { nombre: "Oráculo", xpMinimo: 1500 },
] as const;

export const nivelDesdeXp = (xp: number) =>
  [...NIVELES].reverse().find((n) => xp >= n.xpMinimo) ?? NIVELES[0];

/** Fecha local en formato YYYY-MM-DD, para comparar días de racha */
export const hoyLocal = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

/** Arcano del día: determinista a partir de la fecha (no cambia al reabrir) */
export const cartaDelDia = (fecha = hoyLocal()) => {
  let hash = 0;
  for (const c of fecha) {
    hash = hash * 31 + (c.codePointAt(0) ?? 0);
  }
  return hash % TOTAL_ARCANOS;
};

/** Puntos de vínculo necesarios para cada estrella (1 a 5) */
export const VINCULO_UMBRALES = [1, 3, 7, 15, 30];

export const estrellasVinculo = (puntos: number) =>
  VINCULO_UMBRALES.filter((u) => puntos >= u).length;

const esAyer = (fecha: string) => {
  const ayer = new Date();
  ayer.setDate(ayer.getDate() - 1);
  return fecha === hoyLocal(ayer);
};

interface PlayerState {
  xp: number;
  racha: number;
  /** día (YYYY-MM-DD) de la última tirada, para calcular la racha */
  ultimoDiaTirada: string | null;
  /** día (YYYY-MM-DD) en que se reclamó la última bendición diaria */
  ultimoDiaBendicion: string | null;
  /** puntos de vínculo por arcano (numero -> puntos) */
  vinculos: Record<number, number>;
  /** historial de tiradas, la más reciente primero */
  historial: RegistroTirada[];
  ganarXp: (cantidad: number) => void;
  subirVinculo: (arcano: number, puntos?: number) => void;
  registrarTirada: (cartas: number[]) => void;
  /** recompensa diaria de la carta del día (una vez por día) */
  reclamarBendicion: () => void;
  /** añade la reflexión a la tirada más reciente (da XP la primera vez) */
  anotarEnDiario: (nota: string) => void;
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set, get) => ({
      xp: 0,
      racha: 0,
      ultimoDiaTirada: null,
      ultimoDiaBendicion: null,
      vinculos: {},
      historial: [],

      ganarXp: (cantidad) => set((s) => ({ xp: s.xp + cantidad })),

      subirVinculo: (arcano, puntos = 1) =>
        set((s) => ({
          vinculos: {
            ...s.vinculos,
            [arcano]: (s.vinculos[arcano] ?? 0) + puntos,
          },
        })),

      registrarTirada: (cartas) => {
        const { ultimoDiaTirada, racha, vinculos } = get();
        const hoy = hoyLocal();
        let nuevaRacha = racha;
        if (ultimoDiaTirada !== hoy) {
          nuevaRacha = ultimoDiaTirada && esAyer(ultimoDiaTirada) ? racha + 1 : 1;
        }
        const nuevosVinculos = { ...vinculos };
        cartas.forEach((c) => {
          nuevosVinculos[c] = (nuevosVinculos[c] ?? 0) + 1;
        });
        set((s) => ({
          xp: s.xp + XP_POR_TIRADA,
          racha: nuevaRacha,
          ultimoDiaTirada: hoy,
          vinculos: nuevosVinculos,
          historial: [
            { fecha: new Date().toISOString(), cartas },
            ...s.historial,
          ],
        }));
      },

      reclamarBendicion: () => {
        const { ultimoDiaBendicion, vinculos } = get();
        const hoy = hoyLocal();
        if (ultimoDiaBendicion === hoy) return;
        const arcano = cartaDelDia(hoy);
        set((s) => ({
          xp: s.xp + XP_POR_BENDICION,
          ultimoDiaBendicion: hoy,
          vinculos: { ...vinculos, [arcano]: (vinculos[arcano] ?? 0) + 1 },
        }));
      },

      anotarEnDiario: (nota) =>
        set((s) => {
          if (s.historial.length === 0) return s;
          const [reciente, ...resto] = s.historial;
          // XP solo la primera vez que se escribe reflexión en esta tirada
          const esPrimeraNota = !reciente.nota && nota.trim().length > 0;
          return {
            historial: [{ ...reciente, nota }, ...resto],
            xp: esPrimeraNota ? s.xp + XP_POR_REFLEXION : s.xp,
          };
        }),
    }),
    {
      name: "arcania-player",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

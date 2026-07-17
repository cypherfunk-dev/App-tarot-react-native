import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
const hoyLocal = (d = new Date()) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

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
  /** puntos de vínculo por arcano (numero -> puntos) */
  vinculos: Record<number, number>;
  /** historial de tiradas, la más reciente primero */
  historial: RegistroTirada[];
  ganarXp: (cantidad: number) => void;
  subirVinculo: (arcano: number, puntos?: number) => void;
  registrarTirada: (cartas: number[]) => void;
  /** añade la reflexión a la tirada más reciente */
  anotarEnDiario: (nota: string) => void;
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set, get) => ({
      xp: 0,
      racha: 0,
      ultimoDiaTirada: null,
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

      anotarEnDiario: (nota) =>
        set((s) => {
          if (s.historial.length === 0) return s;
          const [reciente, ...resto] = s.historial;
          return { historial: [{ ...reciente, nota }, ...resto] };
        }),
    }),
    {
      name: "arcania-player",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

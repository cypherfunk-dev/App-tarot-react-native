import { create } from "zustand";

// Estado de sesión (no persistido): flujo de la tirada actual.
// Reemplaza al antiguo ApplicationContext de app/(tabs)/_layout.
interface AppState {
  /** true cuando la tirada terminó y se muestra la lectura */
  isLectura: boolean;
  /** números de arcano seleccionados, en orden de selección */
  isResultado: number[];
  setIsLectura: (v: boolean) => void;
  setIsResultado: (r: number[]) => void;
  reiniciarTirada: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  isLectura: false,
  isResultado: [],
  setIsLectura: (isLectura) => set({ isLectura }),
  setIsResultado: (isResultado) => set({ isResultado }),
  reiniciarTirada: () => set({ isLectura: false, isResultado: [] }),
}));

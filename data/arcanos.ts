import arcanesData from "./arcanes.json";
import modelos from "./models";

// Fuente única de datos de los 22 arcanos mayores.
// Combina la ficha (arcanes.json), la miniatura y el modelo 3D resuelto.
// El orden/numeración sigue el tarot de Marsella (8 = Justicia, 11 = Fuerza),
// igual que las imágenes en assets/images/miniaturas.

export interface Arcano {
  numero: number;
  nombre: string;
  descripcion: string;
  palabrasClave: string[];
  decks: string[];
  correspondencias: Record<string, string>[];
  /** Asset de la miniatura (require) */
  miniatura: number;
  /** Asset del modelo .glb, o null si aún no existe */
  modelo3d: number | null;
  /** Persona para el chat (Fase 2) */
  personalidad?: string;
}

const miniaturas = [
  require("../assets/images/miniaturas/0.jpg"),
  require("../assets/images/miniaturas/1.jpg"),
  require("../assets/images/miniaturas/2.jpg"),
  require("../assets/images/miniaturas/3.jpg"),
  require("../assets/images/miniaturas/4.jpg"),
  require("../assets/images/miniaturas/5.jpg"),
  require("../assets/images/miniaturas/6.jpg"),
  require("../assets/images/miniaturas/7.jpg"),
  require("../assets/images/miniaturas/8.jpg"),
  require("../assets/images/miniaturas/9.jpg"),
  require("../assets/images/miniaturas/10.jpg"),
  require("../assets/images/miniaturas/11.jpg"),
  require("../assets/images/miniaturas/12.jpg"),
  require("../assets/images/miniaturas/13.jpg"),
  require("../assets/images/miniaturas/14.jpg"),
  require("../assets/images/miniaturas/15.jpg"),
  require("../assets/images/miniaturas/16.jpg"),
  require("../assets/images/miniaturas/17.jpg"),
  require("../assets/images/miniaturas/18.jpg"),
  require("../assets/images/miniaturas/19.jpg"),
  require("../assets/images/miniaturas/20.jpg"),
  require("../assets/images/miniaturas/21.jpg"),
];

export const cardBack = require("../assets/images/miniaturas/back.jpg");

export const arcanos: Arcano[] = arcanesData.map((a, index) => ({
  numero: a.numero,
  nombre: a.nombre,
  descripcion: a.descripcion,
  palabrasClave: a.palabras_clave ?? [],
  decks: a.decks,
  correspondencias: a.correspondencias as unknown as Record<string, string>[],
  miniatura: miniaturas[index],
  modelo3d: (a.modelo && modelos[a.modelo]) || null,
}));

export const TOTAL_ARCANOS = arcanos.length;

export const getArcano = (numero: number): Arcano => {
  const arcano = arcanos[numero];
  if (!arcano) {
    throw new Error(`Arcano ${numero} no existe (0-${TOTAL_ARCANOS - 1})`);
  }
  return arcano;
};

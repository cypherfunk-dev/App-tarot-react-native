// Modelos 3D disponibles (5 de 22). Los restantes están pendientes de
// producción — ver ROADMAP.md, "Deuda técnica".
const modelos: Record<string, number> = {
  sacer: require("../assets/models/sacer.glb"),
  ermita: require("../assets/models/hermit.glb"),
  muerte: require("../assets/models/death.glb"),
  torre: require("../assets/models/tower.glb"),
  juicio: require("../assets/models/judgement.glb"),
};

export default modelos;

import React from "react";
import { useAppStore } from "../../stores/appStore";
import Lectura from "../../components/Lectura";
import TiradaSeleccion from "../../components/TiradaSeleccion";

const Tirada = () => {
  const isLectura = useAppStore((s) => s.isLectura);

  return isLectura ? <Lectura /> : <TiradaSeleccion />;
};

export default Tirada;

import React, { useContext } from "react";
import { ApplicationContext } from "../../app/(tabs)/_layout";
import Lectura from "../../components/Lectura";
import TiradaSeleccion from "../../components/TiradaSeleccion";

const Tirada = () => {
  const context = useContext(ApplicationContext);

  if (!context) {
    throw new Error("ApplicationContext no está disponible.");
  }

  const { isLectura } = context;

  if (isLectura) {
    return <Lectura />;
  } else {
    return <TiradaSeleccion />;
  }
};

export default Tirada;

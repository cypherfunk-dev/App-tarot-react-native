import React, { useEffect, useState } from "react";
import Lectura from "../../components/Lectura";
import TiradaSeleccion from "../../components/TiradaSeleccion";

const Tirada = () => {
  const [islectura, setIsLectura] = useState(false);

  useEffect(() => {
    // Example: setLectura based on some condition or event
    const timer = setTimeout(() => setIsLectura(true), 3000);
    return () => clearTimeout(timer);
  }, []);
  if (islectura) {
    return <Lectura />;
  } else {
    return <TiradaSeleccion />;
  }
};

export default Tirada;

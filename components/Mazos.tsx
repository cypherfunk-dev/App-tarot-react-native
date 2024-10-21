import React from "react";
import { Image } from "react-native";
import AwesomeGallery from "react-native-awesome-gallery";

const images = [
  require("../assets/images/Mazos/2/2_1.jpg"),
  require("../assets/images/Mazos/2/2_2.jpg"),
];

const Mazos = () => {
  return (
    <AwesomeGallery
      data={images.map((image) => ({ uri: image }))}
      keyExtractor={(_, index) => index.toString()} // Usamos el índice como clave única
      renderItem={({ item }) => (
        <Image source={item.uri} style={{ width: "100%", height: "100%" }} />
      )}
      initialIndex={0} // Comienza desde la primera imagen
      maxScale={3} // Escala máxima
    />
  );
};

export default Mazos;

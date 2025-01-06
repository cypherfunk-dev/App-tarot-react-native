import React, { useContext } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { BlurView } from "expo-blur";
import PagerView from "react-native-pager-view";
import config from "../assets/data/data.json";
import { ApplicationContext } from "../app/(tabs)/_layout";
import { images } from "../assets/data/images.js";

const loadConfigFromAssets = () => {
  JSON.stringify(config);
  return config;
};

const Lectura = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error("ApplicationContext no está disponible.");
  }
  const { isResultado } = context;
  loadConfigFromAssets();
  // filtra en base a el resultado
  const image = images.filter((_, index) => isResultado.includes(index));
  return (
    <PagerView
      style={styles.container}
      initialPage={0}
      orientation={"horizontal"}
    >
      {image.map((item, index) => (
        <View key={index + 1} style={styles[`page${index + 1}`]}>
          <Text style={styles.Tittle}>{item.nombre}</Text>
          <Image source={item.image} style={styles.image} />
          <BlurView intensity={100} style={styles.cuadrotexto}>
            <Text style={styles.text}>{item.descripcion}</Text>
          </BlurView>
        </View>
      ))}
    </PagerView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page1: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#7a89c2",
  },
  page2: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e3d7ff",
  },
  page3: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#636b61",
  },
  Tittle: {
    fontSize: 42,
  },
  text: {
    fontSize: 18,
  },
  image: {
    height: 400,
    width: 200,
    resizeMode: "contain",
  },
  cuadrotexto: {
    width: 400,
    height: 250,

    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Lectura;

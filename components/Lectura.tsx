import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { BlurView } from "expo-blur";
import PagerView from "react-native-pager-view";
import { useAppStore } from "../stores/appStore";
import { getArcano } from "../data/arcanos";

const coloresPagina = ["#7a89c2", "#e3d7ff", "#636b61"];

const Lectura = () => {
  const isResultado = useAppStore((s) => s.isResultado);
  // Muestra las cartas en el mismo orden en que fueron seleccionadas
  const cartas = isResultado.map((numero) => getArcano(numero));

  return (
    <PagerView
      style={styles.container}
      initialPage={0}
      orientation={"horizontal"}
    >
      {cartas.map((arcano, index) => (
        <View
          key={arcano.numero}
          style={[
            styles.page,
            { backgroundColor: coloresPagina[index % coloresPagina.length] },
          ]}
        >
          <Text style={styles.titulo}>{arcano.nombre}</Text>
          <Image source={arcano.miniatura} style={styles.image} />
          <BlurView intensity={100} style={styles.cuadrotexto}>
            <Text style={styles.text}>{arcano.descripcion}</Text>
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
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
  titulo: {
    fontSize: 42,
  },
  text: {
    fontSize: 18,
    padding: 16,
    textAlign: "center",
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

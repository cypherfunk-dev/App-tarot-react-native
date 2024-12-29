import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { BlurView } from "expo-blur";
import PagerView from "react-native-pager-view";
const image = [
  require("../../assets/images/miniaturas/4.jpg"),
  require("../../assets/images/miniaturas/8.jpg"),
  require("../../assets/images/miniaturas/18.jpg"),
];

const Explorar = () => {
  return (
    <PagerView
      style={styles.container}
      initialPage={0}
      orientation={"horizontal"}
    >
      <View key="1" style={styles.page1}>
        <Text style={styles.Tittle}>El Emperador</Text>
        <Image source={image[0]} style={styles.image} />
        <BlurView intensity={100} style={styles.cuadrotexto}>
          <Text style={styles.text}>
            El Emperador es una carta que representa la autoridad, la
            estabilidad y el poder. Es un símbolo de la estructura y la
            jerarquía, y de cómo estas pueden ser utilizadas para el bien de
            todos. El Emperador es una figura paterna, un líder y un protector.
            Es una carta que nos recuerda que debemos ser responsables y
            cuidadosos con nuestras acciones, y que debemos usar nuestro poder
            para el bien de todos.
          </Text>
        </BlurView>
      </View>
      <View key="2" style={styles.page2}>
        <Text style={styles.Tittle}>La Justicia</Text>
        <Image source={image[1]} style={styles.image} />
        <BlurView intensity={100} style={styles.cuadrotexto}>
          <Text style={styles.text}>
            La Justicia es una carta que representa la verdad, la equidad y la
            ley. Es un símbolo de la justicia y la imparcialidad, y de cómo
            estas pueden ser utilizadas para resolver conflictos y tomar
            decisiones difíciles. La Justicia es una carta que nos recuerda que
            debemos ser honestos y justos en todas nuestras acciones, y que
            debemos tratar a los demás con respeto y compasión.
          </Text>
        </BlurView>
      </View>
      <View key="3" style={styles.page3}>
        <Text style={styles.Tittle}>La Luna</Text>
        <Image source={image[2]} style={styles.image} />
        <BlurView intensity={100} style={styles.cuadrotexto}>
          <Text style={styles.text}>
            La Luna es una carta que representa la intuición, la imaginación y
            los sueños. Es un símbolo de la oscuridad y de lo desconocido, y de
            cómo estos pueden ser utilizados para encontrar respuestas y
            soluciones a nuestros problemas. La Luna es una carta que nos
            recuerda que debemos confiar en nuestra intuición y en nuestros
            instintos, y que debemos estar abiertos a nuevas ideas y
            experiencias.
          </Text>
        </BlurView>
      </View>
    </PagerView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page1: {
    justifyContent: "space-around",
    paddingTop: 100,
    alignItems: "center",
    backgroundColor: "#7a89c2",
    paddingBottom: 100,
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

export default Explorar;

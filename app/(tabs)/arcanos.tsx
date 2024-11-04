import React, { useState, Suspense } from "react";
import { View, StyleSheet, Text, Modal, Pressable } from "react-native";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Card } from "./Card";

const images = [
  require("../../assets/images/miniaturas/0.jpg"),
  require("../../assets/images/miniaturas/1.jpg"),
  require("../../assets/images/miniaturas/2.jpg"),
  require("../../assets/images/miniaturas/3.jpg"),
  require("../../assets/images/miniaturas/4.jpg"),
  require("../../assets/images/miniaturas/5.jpg"),
  require("../../assets/images/miniaturas/6.jpg"),
  require("../../assets/images/miniaturas/7.jpg"),
  require("../../assets/images/miniaturas/8.jpg"),
  require("../../assets/images/miniaturas/9.jpg"),
  require("../../assets/images/miniaturas/10.jpg"),
  require("../../assets/images/miniaturas/11.jpg"),
  require("../../assets/images/miniaturas/12.jpg"),
  require("../../assets/images/miniaturas/13.jpg"),
  require("../../assets/images/miniaturas/14.jpg"),
  require("../../assets/images/miniaturas/15.jpg"),
  require("../../assets/images/miniaturas/16.jpg"),
  require("../../assets/images/miniaturas/17.jpg"),
  require("../../assets/images/miniaturas/18.jpg"),
  require("../../assets/images/miniaturas/19.jpg"),
  require("../../assets/images/miniaturas/20.jpg"),
  require("../../assets/images/miniaturas/21.jpg"),
];

const Arcanos: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handlePress = () => {
    setModalVisible(true); // Mostrar el modal al presionar
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.grid}>
          {Array.from({ length: 22 }).map((_, index) => (
            <View key={index} style={styles.square}>
              <Pressable
                style={styles.pressable}
                onPress={() => {
                  handlePress();
                }}
              >
                <Image
                  style={styles.image}
                  source={images[index]} // Usar el índice para obtener la imagen
                  contentFit="cover"
                  transition={1000}
                />
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
      <Modal
        visible={modalVisible}
        presentationStyle="overFullScreen" // Cambiar el estilo de presentación del modal
        onRequestClose={() => setModalVisible(false)}
      >
        <Suspense fallback={<Text>Loading...</Text>}>
          <Card />

        </Suspense>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 10,
    backgroundColor: "black",
  },
  buttonContainer: {
    position: "absolute",
    top: 50,
    left: 180,
    flexDirection: "row",
    justifyContent: "space-between",
    width: 100,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: 320,
  },
  square: {
    width: 100,
    height: 150,
    margin: 2,
    backgroundColor: "lightgray",
  },
  pressable: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

export default Arcanos;

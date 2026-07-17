import React, { useState, Suspense } from "react";
import { View, StyleSheet, Text, Modal, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Card } from "../../components/vistaArcano/Card";
import { arcanos } from "../../data/arcanos";

const images = arcanos.map((arcano) => arcano.miniatura);

const Arcanos: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [card, setCard] = useState(0); // Estado para almacenar el índice del arcano seleccionado
  const handlePress = (selectedCard: number) => {
    setCard(selectedCard); // Establecer el índice del arcano seleccionado
    setModalVisible(true); // Mostrar el modal al presionar
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.grid}>
          {images.map((image, index) => (
            <View key={image} style={styles.square}>
              <Pressable
                style={styles.pressable}
                onPress={() => {
                  handlePress(index);
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
          <Card arcane={card} />
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

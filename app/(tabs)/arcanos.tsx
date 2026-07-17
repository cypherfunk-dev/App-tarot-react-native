import React, { useState, Suspense } from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Card } from "../../components/vistaArcano/Card";
import { arcanos } from "../../data/arcanos";
import { usePlayerStore, estrellasVinculo } from "../../stores/playerStore";

const Arcanos: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [card, setCard] = useState(0); // Estado para almacenar el índice del arcano seleccionado
  const vinculos = usePlayerStore((s) => s.vinculos);

  const handlePress = (selectedCard: number) => {
    setCard(selectedCard); // Establecer el índice del arcano seleccionado
    setModalVisible(true); // Mostrar el modal al presionar
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Grimorio</Text>
      <ScrollView>
        <View style={styles.grid}>
          {arcanos.map((arcano) => {
            const puntos = vinculos[arcano.numero] ?? 0;
            const estrellas = estrellasVinculo(puntos);
            const dormido = puntos === 0;
            return (
              <View key={arcano.numero} style={styles.square}>
                <Pressable
                  style={styles.pressable}
                  onPress={() => handlePress(arcano.numero)}
                >
                  <Image
                    style={[styles.image, dormido && styles.imageDormida]}
                    source={arcano.miniatura}
                    contentFit="cover"
                    transition={1000}
                  />
                  {dormido ? (
                    <Text style={styles.badgeDormido}>💤</Text>
                  ) : (
                    <Text style={styles.badgeEstrellas}>
                      {"★".repeat(Math.max(estrellas, 1))}
                    </Text>
                  )}
                </Pressable>
              </View>
            );
          })}
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
  titulo: {
    color: "#f0e6d2",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
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
    backgroundColor: "#1a1826",
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
  imageDormida: {
    opacity: 0.35,
  },
  badgeDormido: {
    position: "absolute",
    bottom: 4,
    right: 6,
    fontSize: 14,
  },
  badgeEstrellas: {
    position: "absolute",
    bottom: 4,
    right: 6,
    color: "#ffd700",
    fontSize: 12,
    textShadowColor: "black",
    textShadowRadius: 3,
  },
});

export default Arcanos;

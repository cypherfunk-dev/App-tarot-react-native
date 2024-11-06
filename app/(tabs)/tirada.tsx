import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CardBack from "../../assets/images/miniaturas/back.jpg";
import { Image } from "expo-image";
import { View, StyleSheet, Pressable, Text } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  runOnJS,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

const Tirada = () => {
  const cards = new Array(22).fill(null).map(() => ({
    translateY: useSharedValue(0),
    translateX: useSharedValue(0),
    rotation: useSharedValue(0),
    zIndex: useSharedValue(0),
  }));

  const shuffleCards = async () => {
    const wait = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));
    // Paso 1: Mezcla inicial aleatoria de las cartas en X e Y
    cards.forEach((card, index) => {
      const randomX = Math.random() * 200 - 100; // Movimiento aleatorio en X
      const randomY = Math.random() * 200 - 100; // Movimiento aleatorio en Y
      const randomRotation = Math.random() * 360; // Rotación aleatoria para más variabilidad

      card.translateX.value = withTiming(randomX, { duration: 300 });
      card.translateY.value = withTiming(randomY, { duration: 300 });
      card.rotation.value = withTiming(randomRotation, { duration: 300 });
    });
    // Paso 2: Elevar las cartas superiores
    setTimeout(() => {
      const topCards = cards.slice(11, 21);
      topCards.forEach((card, idx) => {
        card.zIndex.value = 1;
        card.translateY.value = withTiming(-350, { duration: 300 });
        card.translateX.value = withTiming(Math.random() * 50 - 25, {
          duration: 300,
        });

        // Retornar estas cartas al fondo del mazo
        setTimeout(
          () => {
            card.translateY.value = withTiming(0, { duration: 300 });
            card.translateX.value = withTiming(0, { duration: 300 });
            card.zIndex.value = -99;
          },
          800 + idx * 100
        ); // Delay escalonado para efecto de bajada
      });
    }, 800);
    await wait(1500); // Pausa de 300ms (tiempo de duración de la animación)

    // Paso 3: Elevar las cartas inferiores
    setTimeout(() => {
      const botCards = cards.slice(0, 10);
      botCards.forEach((card, idx) => {
        card.zIndex.value = 1;
        card.translateY.value = withTiming(-300, { duration: 300 });
        card.translateX.value = withTiming(Math.random() * 50 - 25, {
          duration: 300,
        });

        // Retornar estas cartas al fondo del mazo
        setTimeout(
          () => {
            card.translateY.value = withTiming(0, { duration: 300 });
            card.translateX.value = withTiming(0, { duration: 300 });
            card.zIndex.value = -99;
          },
          1000 + idx * 100
        ); // Delay escalonado para efecto de bajada
      });
    }, 1300);
    await wait(1500); // Pausa de 300ms (tiempo de duración de la animación)
    setTimeout(() => {
      cards.forEach((card) => {
        card.translateX.value = withTiming(0, { duration: 300 });
        card.translateY.value = withTiming(0, { duration: 300 });
      });
    }, cards.length * 100); // Esperar a que todas las cartas terminen de mezclarse
    // Paso 4: Organizar todas las cartas en una forma semicircular (como una sonrisa)
    await wait(2000); // Pausa de 300ms (tiempo de duración de la animación)

    setTimeout(() => {
      cards.forEach((card, index) => {
        const centerX = 120; // Posición central en X
        const centerY = -160; // Posición central en Y, un poco hacia abajo para la forma de sonrisa
        const radius = 80; // Radio del círculo
        const totalCards = cards.length;

        const angle = (index / totalCards) * Math.PI; // Distribución semicircular
        const x = centerX + radius * Math.cos(angle);
        const y = centerY + radius * Math.sin(angle);

        // Movimiento suave de las cartas para colocarlas en la forma semicircular
        card.translateX.value = withTiming(x, { duration: 500 });
        card.translateY.value = withTiming(y, { duration: 500 });
        card.zIndex.value = 0; // Aseguramos que todas las cartas queden al mismo nivel en Z
      });
    }, 2500); // Después de todo el desorden, organizamos en la forma semicircular
  };

  return (
    <SafeAreaView style={styles.container}>
      {cards.map((card, index) => {
        const animatedCardStyle = useAnimatedStyle(() => ({
          transform: [
            { translateX: card.translateX.value },
            { translateY: card.translateY.value },
          ],
          zIndex: index, // Controlar el índice de superposición
        }));

        return (
          <Animated.View key={index} style={[styles.card, animatedCardStyle]}>
            <Pressable>
              <Image
                source={CardBack}
                contentFit="cover"
                style={styles.image}
              />
            </Pressable>
          </Animated.View>
        );
      })}
      <View style={styles.containerboton}>
        <Pressable style={styles.button} onPress={shuffleCards}>
          <LinearGradient
            colors={["#4c669f", "#3b5998", "#1a3f69"]}
            style={styles.button}
          >
            <Text style={styles.buttonLabel}>Revolver Cartas</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 100,
  },
  card: {
    height: 300,
    aspectRatio: 2 / 3,
    position: "absolute",
    marginBottom: 50,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  containerboton: {
    alignItems: "flex-end",
    marginBottom: -80,
    justifyContent: "center",
    width: 220,
    height: 68,
    marginHorizontal: 20,
    padding: 3,
  },
  button: {
    borderRadius: 30,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 1.5,
    borderColor: "#cdac8d",
  },
  buttonLabel: {
    color: "#dddae1",
    fontSize: 16,
  },
});

export default Tirada;

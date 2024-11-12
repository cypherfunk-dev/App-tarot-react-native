import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CardBack from "../../assets/images/miniaturas/back.jpg";
import { Image } from "expo-image";
import { View, StyleSheet, Pressable, Text, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { Accelerometer } from "expo-sensors";
const { width, height } = Dimensions.get("window");

const Tirada = () => {
  // Parámetros y hooks para el acelerómetro
  const [{ x, y, z }, setData] = useState({ x: 0, y: 0, z: 0 });
  const [subscription, setSubscription] =
    useState<Accelerometer.Subscription | null>(null);

  const [lastShakeTime, setLastShakeTime] = useState(Date.now());
  const [selectedCards, setSelectedCards] = useState<boolean[]>(
    new Array(22).fill(false)
  );
  const [cardStyle, setCardStyle] = useState<any[]>(
    new Array(22).fill({ borderWidth: 0 })
  );

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener((data) => {
        setData(data);

        // Detectar si el dispositivo ha sido agitado
        const acceleration = Math.sqrt(
          data.x * data.x + data.y * data.y + data.z * data.z
        );
        if (acceleration > 1.7) {
          setShuffling(true);
          // Ajusta este valor para mayor o menor sensibilidad
          const currentTime = Date.now();
          if (currentTime - lastShakeTime > 500) {
            // Intervalo para evitar múltiples logs en un mismo movimiento
            cards.forEach((card, index) => {
              // Generar valores aleatorios para los ejes X y Y
              const randomX = Math.random() * 150 - 75;
              const randomY = Math.random() * 150 - 75;

              // Aplicar el movimiento con un leve desfase para efecto de "mezcla"
              setTimeout(() => {
                card.translateX.value = withTiming(randomX, { duration: 100 });
                card.translateY.value = withTiming(randomY, { duration: 100 });
              }, index * 100);
            });
            setLastShakeTime(currentTime);
            setShuffling(false);
          }
        }
      })
    );
  };

  const _unsubscribe = () => {
    subscription && subscription.remove();
    setSubscription(null);
  };

  useEffect(() => {
    _subscribe();
    return () => _unsubscribe();
  }, []);
  // Fin acelerometro
  const [count, setCount] = useState(0);

  const [IsShuffling, setShuffling] = useState(false);

  const cards = new Array(22).fill(null).map(() => ({
    translateY: useSharedValue(0),
    translateX: useSharedValue(0),
    rotation: useSharedValue(0),
    zIndex: useSharedValue(0),
  }));

  const deselectAllCards = () => {
    setSelectedCards(new Array(selectedCards.length).fill(false));
    setCount(0);
    setCardStyle(new Array(cardStyle.length).fill({ borderWidth: 0 }));
  };

  const shuffleCards = async () => {
    if (IsShuffling) return;
    setShuffling(true);
    deselectAllCards();
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
      cards.forEach((card, index) => {
        card.translateX.value = withTiming(index * -1.2, { duration: 300 });
        card.translateY.value = withTiming(index * 1.2, { duration: 300 });
      });
    }, cards.length * 100); // Esperar a que todas las cartas terminen de mezclarse
    // Paso 4: Organizar todas las cartas en una forma semicircular (como una sonrisa)
    await wait(2000); // Pausa de 300ms (tiempo de duración de la animación)
    setTimeout(() => {
      cards.forEach((card, index) => {
        const centerX = width / 20; // Posición central en X
        const centerY = height / 9; // Posición central en Y, un poco hacia abajo para la forma de sonrisa
        const radius = 200; // Radio del círculo
        const totalCards = cards.length;

        const angle = (index / totalCards / 2) * Math.PI; // Distribución semicircular
        const x = centerX + radius * Math.cos(angle) - 150; // Ajustar para centrar
        const y = centerY + radius * Math.sin(angle) - 180; // Ajustar para centrar

        // Movimiento suave de las cartas para colocarlas en la forma semicircular
        card.translateX.value = withTiming(x, { duration: 500 });
        card.translateY.value = withTiming(y, { duration: 500 });
        card.zIndex.value = 0;
      });
    }, 2500);
    await wait(3000); // Pausa de 300ms (tiempo de duración de la animación)
    setTimeout(() => {
      setShuffling(false);
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.container}>
      {cards.map((card, index) => {
        const selectCardHandler = () => {
          if (count < 3 && !selectedCards[index]) {
            setSelectedCards((prev) => {
              const newSelectedCards = [...prev];
              newSelectedCards[index] = true;
              return newSelectedCards;
            });
            setCount(count + 1);
            card.translateY.value = withTiming(card.translateY.value - 100, {
              duration: 500,
            });
            setCardStyle((prev) => {
              const newCardStyles = [...prev];
              newCardStyles[index] = { borderColor: "blue", borderWidth: 3 };
              return newCardStyles;
            });
          } else if (selectedCards[index]) {
            setSelectedCards((prev) => {
              const newSelectedCards = [...prev];
              newSelectedCards[index] = false;
              return newSelectedCards;
            });
            setCount(count - 1);
            card.translateY.value = withTiming(card.translateY.value + 100, {
              duration: 500,
            });
            setCardStyle((prev) => {
              const newCardStyles = [...prev];
              newCardStyles[index] = { borderWidth: 0 };
              return newCardStyles;
            });
          }
        };

        const animatedCardStyle = useAnimatedStyle(() => ({
          transform: [
            { translateX: card.translateX.value },
            { translateY: card.translateY.value },
          ],
          zIndex: index,
        }));

        return (
          <Animated.View key={index} style={[styles.card, animatedCardStyle]}>
            <Pressable onPress={selectCardHandler}>
              <Image
                source={CardBack}
                contentFit="cover"
                style={[styles.image, cardStyle[index]]}
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
            <Text style={styles.buttonLabel}>Barajar Cartas</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    height: 300,
    aspectRatio: 3 / 6,
    position: "absolute",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  containerboton: {
    position: "absolute",
    bottom: 20, // Ajusta este valor según sea necesario
    alignItems: "center",
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

import React, { useEffect, useState, useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";

const CardBack = require("../assets/images/miniaturas/back.jpg");
import { View, StyleSheet, Pressable, Text, Dimensions } from "react-native";
import Animated, {
  useAnimatedStyle,
  withTiming,
  makeMutable,
  SharedValue,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import FlipCard from "react-native-flip-card";
import { useAppStore } from "../stores/appStore";
import { usePlayerStore } from "../stores/playerStore";

const images = [
  { indice: 0, ruta: require("../assets/images/miniaturas/0.jpg") },
  { indice: 1, ruta: require("../assets/images/miniaturas/1.jpg") },
  { indice: 2, ruta: require("../assets/images/miniaturas/2.jpg") },
  { indice: 3, ruta: require("../assets/images/miniaturas/3.jpg") },
  { indice: 4, ruta: require("../assets/images/miniaturas/4.jpg") },
  { indice: 5, ruta: require("../assets/images/miniaturas/5.jpg") },
  { indice: 6, ruta: require("../assets/images/miniaturas/6.jpg") },
  { indice: 7, ruta: require("../assets/images/miniaturas/7.jpg") },
  { indice: 8, ruta: require("../assets/images/miniaturas/8.jpg") },
  { indice: 9, ruta: require("../assets/images/miniaturas/9.jpg") },
  { indice: 10, ruta: require("../assets/images/miniaturas/10.jpg") },
  { indice: 11, ruta: require("../assets/images/miniaturas/11.jpg") },
  { indice: 12, ruta: require("../assets/images/miniaturas/12.jpg") },
  { indice: 13, ruta: require("../assets/images/miniaturas/13.jpg") },
  { indice: 14, ruta: require("../assets/images/miniaturas/14.jpg") },
  { indice: 15, ruta: require("../assets/images/miniaturas/15.jpg") },
  { indice: 16, ruta: require("../assets/images/miniaturas/16.jpg") },
  { indice: 17, ruta: require("../assets/images/miniaturas/17.jpg") },
  { indice: 18, ruta: require("../assets/images/miniaturas/18.jpg") },
  { indice: 19, ruta: require("../assets/images/miniaturas/19.jpg") },
  { indice: 20, ruta: require("../assets/images/miniaturas/20.jpg") },
  { indice: 21, ruta: require("../assets/images/miniaturas/21.jpg") },
];

const { width, height } = Dimensions.get("window");

const TOTAL_CARDS = images.length;

type CardAnim = {
  translateX: SharedValue<number>;
  translateY: SharedValue<number>;
  rotation: SharedValue<number>;
  zIndex: SharedValue<number>;
};

// Crea los valores animados una sola vez, fuera del render-loop, para no
// llamar hooks dentro de un .map() (Reglas de Hooks).
const createCards = (): CardAnim[] =>
  new Array(TOTAL_CARDS).fill(null).map(() => ({
    translateX: makeMutable(0),
    translateY: makeMutable(0),
    rotation: makeMutable(0),
    zIndex: makeMutable(0),
  }));

type TarotCardProps = {
  card: CardAnim;
  index: number;
  frontSource: number;
  borderStyle: object;
  isFlipped: boolean;
  onPress: () => void;
};

// Cada carta es su propio componente: así su useAnimatedStyle vive en el
// nivel superior de un componente, no dentro de un bucle.
const TarotCard = ({
  card,
  index,
  frontSource,
  borderStyle,
  isFlipped,
  onPress,
}: TarotCardProps) => {
  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: card.translateX.value + index * -1.1 },
      { translateY: card.translateY.value + index * 1.05 },
    ],
    zIndex: card.zIndex.value,
  }));

  return (
    <Animated.View style={[styles.card, animatedCardStyle]}>
      <FlipCard
        style={[styles.card]}
        friction={8}
        perspective={150}
        flipHorizontal={true}
        flipVertical={false}
        flip={isFlipped}
        clickable={false}
      >
        <Pressable onPress={onPress}>
          <Image
            source={CardBack}
            contentFit="cover"
            style={[styles.image, borderStyle]}
          />
        </Pressable>
        <Pressable onPress={onPress}>
          <Image
            source={frontSource}
            contentFit="cover"
            style={[styles.image, borderStyle]}
          />
        </Pressable>
      </FlipCard>
    </Animated.View>
  );
};

const TiradaSeleccion = () => {
  const [selectedCards, setSelectedCards] = useState<boolean[]>(
    new Array(TOTAL_CARDS).fill(false)
  );
  const [cardStyle, setCardStyle] = useState<object[]>(
    new Array(TOTAL_CARDS).fill({ borderWidth: 0 })
  );
  const [selectedOrder, setSelectedOrder] = useState<number[]>([]);
  const [isButtonEnabled, setIsButtonEnabled] = useState(true);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const [isButtonActiveStyle, setIsButtonActiveStyle] = useState<
    [string, string, string]
  >(["#4c669f", "#3b5998", "#1a3f69"]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  // Valores animados de las 22 cartas, creados una sola vez.
  const cardsRef = useRef<CardAnim[] | null>(null);
  if (cardsRef.current === null) {
    cardsRef.current = createCards();
  }
  const cards = cardsRef.current;

  const setIsLectura = useAppStore((s) => s.setIsLectura);
  const setIsResultado = useAppStore((s) => s.setIsResultado);
  const registrarTirada = usePlayerStore((s) => s.registrarTirada);

  const shuffleCards = async () => {
    if (isShuffling) return;
    setIsShuffling(true);
    deselectAllCards();
    images.sort(() => Math.random() - 0.5);

    const wait = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));
    // Paso 1: Mezcla inicial aleatoria de las cartas en X e Y
    cards.forEach((card) => {
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
        card.translateX.value = withTiming(index, { duration: 300 });
        card.translateY.value = withTiming(index * 1.002, { duration: 300 });
      });
    }, cards.length * 100); // Esperar a que todas las cartas terminen de mezclarse
    // Paso 4: Organizar todas las cartas en una forma semicircular
    await wait(2000); // Pausa de 300ms (tiempo de duración de la animación)
    setTimeout(() => {
      cards.forEach((card, index) => {
        const centerX = width / 6.5; // Posición central en X
        const centerY = height / 17; // Posición central en Y, un poco hacia abajo para la forma de sonrisa
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
      setIsShuffling(false);
    }, 3000);
  };

  const deselectAllCards = () => {
    setSelectedCards(new Array(TOTAL_CARDS).fill(false));
    setSelectedOrder([]);
    setCardStyle(new Array(TOTAL_CARDS).fill({ borderWidth: 0 }));
  };

  const revealCards = async () => {
    // Elevar cartas no seleccionadas
    cards.forEach((card, index) => {
      if (!selectedCards[index]) {
        card.translateY.value = withTiming(card.translateY.value - 1000, {
          duration: 500,
        });
      }
    });
    // El resultado conserva el orden en que el usuario seleccionó las cartas
    const result = selectedOrder.map((pos) => images[pos].indice);
    setIsResultado(result);
    registrarTirada(result); // XP, racha y vínculos (ver playerStore)
    setIsFlipped(true);

    const baseX = 130; // Punto inicial en X
    const spacing = 120; // Espaciado entre las cartas
    const revealY = 50; // Posición fija en Y

    // Desplegar las cartas seleccionadas en abanico, en orden de selección
    selectedOrder.forEach((pos, selectedIndex) => {
      const card = cards[pos];
      const targetX = baseX + selectedIndex * spacing;
      setTimeout(() => {
        card.translateX.value = withTiming(targetX, { duration: 500 });
        card.translateY.value = withTiming(revealY, { duration: 500 });
      }, 1500);
    });

    setIsOver(true);
  };

  const handleSelect = (index: number) => {
    if (isMoving) return;
    setIsMoving(true);
    const card = cards[index];
    if (selectedOrder.length < 3 && !selectedCards[index]) {
      setSelectedCards((prev) => {
        const newSelectedCards = [...prev];
        newSelectedCards[index] = true;
        return newSelectedCards;
      });
      setSelectedOrder((prev) => [...prev, index]);
      card.translateY.value = withTiming(card.translateY.value - 100, {
        duration: 500,
      });
      setCardStyle((prev) => {
        const newCardStyles = [...prev];
        newCardStyles[index] = {
          borderColor: "blue",
          borderWidth: 3,
        };
        return newCardStyles;
      });
    } else if (selectedCards[index]) {
      setSelectedCards((prev) => {
        const newSelectedCards = [...prev];
        newSelectedCards[index] = false;
        return newSelectedCards;
      });
      setSelectedOrder((prev) => prev.filter((i) => i !== index));
      card.translateY.value = withTiming(card.translateY.value + 100, {
        duration: 500,
      });
      setCardStyle((prev) => {
        const newCardStyles = [...prev];
        newCardStyles[index] = { borderWidth: 0 };
        return newCardStyles;
      });
    }
    setTimeout(() => {
      setIsMoving(false);
    }, 500);
  };

  // boton cambia de comportamiento al seleccionar 3 cartas
  useEffect(() => {
    if (selectedOrder.length === 3) {
      setIsButtonEnabled(true);
      setIsButtonActiveStyle(["#4c669f", "#3b5998", "#1a3f69"]);
    } else {
      setIsButtonEnabled(false);
      setIsButtonActiveStyle(["#808080", "#949494", "#647C90"]);
    }
  }, [selectedOrder]);
  // Delay para mostrar la lectura
  useEffect(() => {
    if (isOver) {
      const timer = setTimeout(() => {
        setIsLectura(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOver, setIsLectura]);

  return (
    <SafeAreaView style={styles.container}>
      {cards.map((card, index) => (
        <TarotCard
          key={index}
          card={card}
          index={index}
          frontSource={images[index].ruta}
          borderStyle={cardStyle[index]}
          isFlipped={isFlipped}
          onPress={() => handleSelect(index)}
        />
      ))}
      <View style={styles.containerboton}>
        <Pressable
          style={[isOver ? styles.buttonOut : styles.button]}
          onPress={shuffleCards}
        >
          <LinearGradient
            colors={["#4c669f", "#3b5998", "#1a3f69"]}
            style={styles.button}
          >
            <Text style={styles.buttonLabel}>Barajar</Text>
          </LinearGradient>
        </Pressable>
        <Pressable
          style={[isOver ? styles.buttonOut : styles.button]}
          onPress={revealCards}
          disabled={!isButtonEnabled}
        >
          <LinearGradient colors={isButtonActiveStyle} style={styles.button}>
            <Text style={styles.buttonLabel}>Voltear</Text>
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
    // backfaceVisibility: "hidden",
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
    marginBottom: 20,
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
    marginVertical: 2,
  },
  buttonOut: {
    display: "none",
  },
  buttonLabel: {
    color: "#dddae1",
    fontSize: 16,
  },
});

export default TiradaSeleccion;

import React, { useEffect, useState, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CardBack from "../assets/images/miniaturas/back.jpg";
import { Image } from "expo-image";
import { View, StyleSheet, Pressable, Text, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import FlipCard from "react-native-flip-card";
import { ApplicationContext } from "../app/(tabs)/_layout";

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

const TiradaSeleccion = () => {
  const [selectedCards, setSelectedCards] = useState<boolean[]>(
    new Array(22).fill(false)
  );
  const [cardStyle, setCardStyle] = useState<any[]>(
    new Array(22).fill({ borderWidth: 0 })
  );
  const [isCount, setIsCount] = useState(0);
  const [isButtonEnabled, setIsButtonEnabled] = useState(true);
  const [isShuffling, setIsShuffling] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const [isButtonActiveStyle, setIsButtonActiveStyle] = useState<any[]>([
    "#4c669f",
    "#3b5998",
    "#1a3f69",
  ]);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  // Inicializacion de las cartas
  const cards = new Array(22).fill(null).map((_, index) => ({
    translateY: useSharedValue(0),
    translateX: useSharedValue(0),
    rotation: useSharedValue(0),
    zIndex: useSharedValue(0),
    arcaneNumber: images[index].indice,
  }));
  // Inicializacion de contexto
  const context = useContext(ApplicationContext);

  if (!context) {
    throw new Error("ApplicationContext no está disponible.");
  }

  const { isLectura, setIsLectura } = context;

  const shuffleCards = async () => {
    if (isShuffling) return;
    setIsShuffling(true);
    deselectAllCards();
    images.sort(() => Math.random() - 0.5);

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
    setSelectedCards(new Array(selectedCards.length).fill(false));
    setIsCount(0);
    setCardStyle(new Array(cardStyle.length).fill({ borderWidth: 0 }));
  };
  const toggleFlip = (result: number[]) => {
    setIsFlipped(!isFlipped);
  };
  const revealCards = async () => {
    console.log(isLectura);
    // Elevar cartas no seleccionadas
    cards.forEach((card, index) => {
      if (!selectedCards[index]) {
        card.translateY.value = withTiming(card.translateY.value - 1000, {
          duration: 500,
        });
      }
    });
    let result: number[] = [];
    images.forEach((_, index) => {
      if (selectedCards[index] === true) {
        result.push(images[index].indice);
      }
    });
    //Se modifica el orden de las cartas seleccionadas, debido a que se obtienen invertidas, finalmente el ultimo elemento del array que sirve de memoria
    result[3] = result[0];
    result[0] = result[2];
    result[2] = result[3];
    result.pop();

    const baseX = 130; // Punto inicial en X
    const spacing = 120; // Espaciado entre las cartas
    const revealY = 50; // Posición fija en Y
    // !!!!IA GENERATED SOLUTION
    // Iterar sobre el estado selectedCards para preservar el orden de selección
    let selectedIndex = 0;
    selectedCards.forEach((isSelected, index) => {
      if (isSelected) {
        const card = cards[index]; // Asegurar que usamos la carta correcta
        const targetX = baseX + selectedIndex * spacing; // Calcular la posición X
        setTimeout(() => {
          card.translateX.value = withTiming(targetX, { duration: 500 }); // Movimiento en X
          card.translateY.value = withTiming(revealY, { duration: 500 }); // Movimiento en Y
        }, 1500);
        selectedIndex--; // Decrecentar índice para la próxima carta seleccionada
        toggleFlip(result);
      }
    });

    setTimeout(() => {
      let count = 0;
      selectedCards.forEach((isSelected, index) => {
        if (isSelected) {
          const card = cards[index];

          // Establecer posiciones específicas para cada carta
          let x = 0; // Posición X por defecto
          let y = 0; // Posición Y por defecto
          if (count === 0) {
            // Primera carta hacia la izquierda
            x = 800; // Mover a la izquierda
            y = 0;
            count++;
          } else if (count === 1) {
            // Segunda carta hacia arriba
            x = 0;
            y = -800; // Mover hacia arriba
            count++;
          } else if (count === 2) {
            // Tercera carta hacia la derecha
            x = -800; // Mover a la derecha
            y = 0;
            count++;
          }
          // Movimiento suave de las cartas
          card.translateX.value = withTiming(x, { duration: 500 });
          card.translateY.value = withTiming(y, { duration: 500 });
          card.zIndex.value = 0; // Asegura que el orden visual sea correcto
        }
      });
    }, 5000);
    setIsOver(true);
  };

  // boton cambia de comportamiento al seleccionar 3 cartas
  useEffect(() => {
    if (isCount === 3) {
      setIsButtonEnabled(true);
      setIsButtonActiveStyle(["#4c669f", "#3b5998", "#1a3f69"]);
    } else {
      setIsButtonEnabled(false);
      setIsButtonActiveStyle(["#808080", "#949494", "#647C90"]);
    }
  }, [isCount]);
  // Delay para mostrar la lectura
  useEffect(() => {
    if (isOver) {
      setTimeout(() => {
        setIsLectura(true);
      }, 5000);
    }
  }, [isOver]);

  return (
    <SafeAreaView style={styles.container}>
      {cards.map((card, index) => {
        const selectCardHandler = () => {
          if (isMoving) return;
          setIsMoving(true);
          if (isCount < 3 && !selectedCards[index]) {
            setSelectedCards((prev) => {
              const newSelectedCards = [...prev];
              newSelectedCards[index] = true;
              return newSelectedCards;
            });
            setIsCount(isCount + 1);
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
            setIsCount(isCount - 1);
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

        const animatedCardStyle = useAnimatedStyle(() => ({
          transform: [
            { translateX: card.translateX.value + index * -1.1 },
            { translateY: card.translateY.value + index * 1.05 },
          ],
          zIndex: card.zIndex.value,
        }));

        return (
          <Animated.View key={index} style={[styles.card, animatedCardStyle]}>
            <FlipCard
              style={[styles.card]}
              friction={8}
              perspective={150}
              flipHorizontal={true}
              flipVertical={false}
              flip={isFlipped}
              clickable={false}
            >
              <Pressable onPress={selectCardHandler}>
                <Image
                  source={CardBack}
                  contentFit="cover"
                  style={[styles.image, cardStyle[index]]}
                />
              </Pressable>
              <Pressable onPress={selectCardHandler}>
                <Image
                  source={images[index].ruta}
                  contentFit="cover"
                  style={[styles.image, cardStyle[index]]}
                />
              </Pressable>
            </FlipCard>
          </Animated.View>
        );
      })}
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

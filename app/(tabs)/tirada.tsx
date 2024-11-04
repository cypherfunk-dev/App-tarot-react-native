import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CardBack from "../../assets/images/miniaturas/back.jpg";
import { Image } from "expo-image";
import { View, StyleSheet, Pressable } from "react-native";
import { Accelerometer } from "expo-sensors";
import BotonMenuPrincipal from "@/components/BotonMenuPrincipal";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const Tirada = () => {
  // Parámetros y hooks para el acelerómetro
  const [{ x, y, z }, setData] = useState({ x: 0, y: 0, z: 0 });
  const [subscription, setSubscription] =
    useState<Accelerometer.Subscription | null>(null);

  const [lastShakeTime, setLastShakeTime] = useState(Date.now());

  const _subscribe = () => {
    setSubscription(
      Accelerometer.addListener((data) => {
        setData(data);

        // Detectar si el dispositivo ha sido agitado
        const acceleration = Math.sqrt(
          data.x * data.x + data.y * data.y + data.z * data.z
        );
        if (acceleration > 1.7) {
          // Ajusta este valor para mayor o menor sensibilidad
          const currentTime = Date.now();
          if (currentTime - lastShakeTime > 500) {
            // Intervalo para evitar múltiples logs en un mismo movimiento
            console.log("¡Dispositivo agitado!");
            setLastShakeTime(currentTime);
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

  return (
    <SafeAreaView style={styles.container}>
      {new Array(22).fill(null).map((_, index) => {
        const translateY = useSharedValue(0);
        const [isSelected, setIsSelected] = useState(false);

        const selectCardHandler = () => {
          setIsSelected(!isSelected);
          if (isSelected) {
            translateY.value = withTiming(0, { duration: 500 });
          } else {
            translateY.value = withTiming(-100, { duration: 500 });
          }
        };
        const animatedCardStyle = useAnimatedStyle(() => {
          return {
            transform: [{ translateY: translateY.value }],
            margin: index * 10,
          };
        });

        return (
          <Animated.View
            key={index}
            style={[
              styles.card,
              animatedCardStyle,
              { transform: [{ translateX: index * 10 }] },
            ]}
          >
            <Pressable onPress={() => selectCardHandler(translateY)}>
              <Image
                source={CardBack}
                contentFit="cover"
                style={styles.image}
              />
            </Pressable>
          </Animated.View>
        );
      })}
      <View style={styles.boton}>
        <BotonMenuPrincipal nombre="Revolver" ruta="gola" />
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
    margin: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  boton: {
    alignItems: "flex-end",
    marginBottom: -80,
    justifyContent: "center",
  },
});

export default Tirada;

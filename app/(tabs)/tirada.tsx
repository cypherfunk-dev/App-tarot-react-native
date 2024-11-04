import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CardBack from "../../assets/images/miniaturas/back.jpg";
import { Image } from "expo-image";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Accelerometer } from "expo-sensors";
import BotonMenuPrincipal from "@/components/BotonMenuPrincipal";

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

  const selectCardHandler = () => {
    // Implementa la lógica para seleccionar una carta
  } 

  const [shake, useShake] = useState();
  // implementar funcion de agitacion
  return (
    <SafeAreaView style={styles.container}>
      {new Array(22).fill(null).map((_, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.card, { transform: [{ translateX: index * 10 }] }]}
          onPress={() => {
            console.log("Tocaste un boton");
          }}
        >
          <Image source={CardBack} contentFit="cover" style={styles.image} />
        </TouchableOpacity>
      ))}
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

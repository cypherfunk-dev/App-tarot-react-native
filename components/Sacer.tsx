import React, { Suspense, useState } from "react";
import { Gltf } from "@react-three/drei/native";
import { Text, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import { Canvas } from "@react-three/fiber/native";
import { OrbitControls } from "@react-three/drei";
import Loader from "@/components/Loader";
import Trigger from "@/components/Trigger";
import sacerModel from "../assets/models/sacer.glb";

export const Sacer = () => {
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated style="light" />

      <View style={styles.modelContainer}>
        {loading && <Loader />}
        <Canvas>
          {/* Control de la cámara y rotación */}
          <OrbitControls
            enablePan={true}  // Puedes habilitar o deshabilitar el paneo
            enableZoom={true} // Controlar el zoom
            autoRotate={false} // Si deseas que rote automáticamente, ajusta esto
            maxPolarAngle={Math.PI / 2} // Limita el ángulo de rotación vertical
            minPolarAngle={Math.PI / 3} // Ajusta el ángulo mínimo
            minAzimuthAngle={-Math.PI / 5} // Limitar rotación horizontal hacia la izquierda
            maxAzimuthAngle={Math.PI / 6} // Limitar rotación horizontal hacia la derecha
          />
          {/* Luces para iluminar el modelo */}
          <directionalLight position={[1, 0, 0]} args={["white", 2]} />
          <directionalLight position={[-1, 0, 0]} args={["white", 2]} />
          <directionalLight position={[0, 0, 1]} args={["white", 2]} />
          <directionalLight position={[0, 0, -1]} args={["white", 2]} />
          <directionalLight position={[0, 1, 0]} args={["white", 15]} />
          <directionalLight position={[0, -1, 0]} args={["white", 2]} />
          {/* Cargar el modelo 3D */}
          <Suspense fallback={<Trigger setLoading={setLoading} />}>
            <group>
              <Gltf src={sacerModel} scale={3} />
            </group>
          </Suspense>
        </Canvas>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.textTitle}>La Alta Sacerdotisa</Text>
        <Text style={styles.text}>
          Imagina a la Alta Sacerdotisa como la guardiana del Wi-Fi cósmico, la
          que tiene todas las contraseñas secretas del universo pero no te las
          va a dar… a menos que te lo ganes. Sentada en su trono de "yo lo sé
          todo", está rodeada de misterios, libros y lunas, porque, claro, ella
          es la reina del drama astrológico. Su especialidad es hacerte sentir
          que tu intuición es un súper poder y que lo más cool del mundo es no
          contarle nada a nadie.
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  textTitle: {
    fontFamily: "Inter-Bold",
    fontSize: 24,
    color: "white",
    textAlign: "center",
  },
  modelContainer: {
    flex: 1,
  },
  textContainer: {
    gap: 4,
    marginVertical: 20,
    paddingHorizontal: 27,
  },
  text: {
    textAlign: "justify",
    fontFamily: "Inter-Bold",
    fontSize: 18,
    color: "white",
  },
});

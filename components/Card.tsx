import React, { Suspense, useState } from "react";
import { Gltf } from "@react-three/drei/native";
import { StyleSheet, View, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Canvas } from "@react-three/fiber/native";
import { OrbitControls } from "@react-three/drei";
import sacerModel from "../assets/models/sacer.glb";

import Loader from "@/components/Loader";
import Trigger from "@/components/Trigger";
import BotonNavModelo from "./vistaArcano/BotonNavModelo"; // Importa tu componente de navegación
import { Info } from "./vistaArcano/Info";
import Mazos from "./vistaArcano/Mazos";
import Correspondencias from "./vistaArcano/Correspondencias";

export const Card = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [active, setActive] = useState<string>("");
  const insets = useSafeAreaInsets();
  const renderActiveComponent = () => {
    switch (active) {
      case "Info":
        return <Info />; // Renderiza el componente Info
      case "Data":
        return <Correspondencias />; // Renderiza el componente Data
      case "Decks":
        return <Mazos />; // Renderiza el componente Decks
      default:
        return <Info />; // Renderiza el componente Info por defecto
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        backgroundColor: "black",
      }}
    >
      <StatusBar animated style="light" />

      {/* Barra de navegación fija */}
      <View style={styles.fixedNavBar}>
        <BotonNavModelo setActiveComponent={setActive} />
      </View>
      {/* Contenedor de la galería de imágenes */}

      {/* ScrollView que contiene el modelo y el texto */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Contenedor del modelo */}
        <View style={styles.modelContainer}>
          {loading && <Loader />}
          <Canvas style={{ height: 400 }}>
            {" "}
            {/* Ajusta la altura del Canvas */}
            {/* Control de la cámara y rotación */}
            <OrbitControls
              enablePan={true} // Puedes habilitar o deshabilitar el paneo
              enableZoom={true} // Controlar el zoom
              autoRotate={true}
              autoRotateSpeed={-1} // Si deseas que rote automáticamente, ajusta esto
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
        {/* Aqui va el componente renderizado */}
        {renderActiveComponent()}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modelContainer: {
    flex: 1,
    marginTop: -42,
  },
  textContainer: {
    gap: 4,
    marginVertical: 30,
    paddingHorizontal: 20,
    marginHorizontal: 17,
    backgroundColor: "purple",
    borderRadius: 20,
  },
  textTitle: {
    padding: 30,
    fontFamily: "Inter-Bold",
    fontSize: 24,
    color: "black",
    textAlign: "center",
  },
  text: {
    textAlign: "left",
    fontFamily: "Inter-Light",
    fontSize: 21,
    color: "black",
    lineHeight: 25,
  },
  fixedNavBar: {
    position: "absolute", // Hace que la barra sea fija
    marginTop: 50, // Ajusta el espacio superior
    padding: 20, // Ajusta el espacio superior
    zIndex: 1, // Asegura que la barra esté por encima del resto de los elementos
  },
  galleryContainer: {
    height: 200, // Ajusta la altura de la galería según sea necesario
    marginVertical: 10,
  },
});

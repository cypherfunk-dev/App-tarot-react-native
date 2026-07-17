import React, { Suspense, useState } from "react";
import { Gltf } from "@react-three/drei/native";
import { StyleSheet, View, ScrollView, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { Canvas } from "@react-three/fiber/native";
import { OrbitControls } from "@react-three/drei";
import { getArcano } from "../../data/arcanos";

import Loader from "@/components/Loader";
import Trigger from "@/components/Trigger";
import BotonNavModelo from "./BotonNavModelo"; // Importa tu componente de navegación
import { Info } from "./Info";
import Mazos from "./Mazos";
import Correspondencias from "./Correspondencias";
import ChatScreen from "./Chatscreen";

export const Card = (arcane) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [active, setActive] = useState<string>("");
  const insets = useSafeAreaInsets();
  const modelonmemory = getArcano(arcane.arcane).modelo3d;
  const hasModel = modelonmemory !== null;
  const renderActiveComponent = () => {
    switch (active) {
      case "Info":
        return <Info arcane={arcane.arcane} />; // Renderiza el componente Info
      case "Data":
        return <Correspondencias arcane={arcane.arcane} />; // Renderiza el componente Data
      case "Decks":
        return <Mazos />; // Renderiza el componente Decks
      case "Chat":
        return <ChatScreen />; // Renderiza el componente Chat
      default:
        return <Info arcane={arcane.arcane} />; // Renderiza el componente Info por defecto
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

      {/* ScrollView que contiene el modelo y el texto */}
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Contenedor del modelo */}
        <View style={styles.modelContainer}>
          {hasModel ? (
            <>
              {loading && <Loader />}
              <Canvas style={{ height: 400 }}>
                {/* Control de la cámara y rotación */}
                <OrbitControls
                  enablePan={true}
                  enableZoom={true}
                  autoRotate={true}
                  autoRotateSpeed={-1}
                  maxPolarAngle={Math.PI / 2}
                  minPolarAngle={Math.PI / 3}
                  minAzimuthAngle={-Math.PI / 5}
                  maxAzimuthAngle={Math.PI / 6}
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
                    {/* require() de un .glb devuelve un module id numérico que Metro resuelve */}
                    <Gltf src={modelonmemory as unknown as string} scale={3} />
                  </group>
                </Suspense>
              </Canvas>
            </>
          ) : (
            <View style={styles.noModelContainer}>
              <Text style={styles.noModelText}>
                Modelo 3D no disponible para este arcano
              </Text>
            </View>
          )}
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
    backgroundColor: "black",
  },
  noModelContainer: {
    height: 400,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  noModelText: {
    color: "#888",
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  fixedNavBar: {
    position: "absolute", // Hace que la barra sea fija
    marginTop: 50, // Ajusta el espacio superior
    padding: 20, // Ajusta el espacio superior
    zIndex: 1, // Asegura que la barra esté por encima del resto de los elementos
  },
});

export default Card;

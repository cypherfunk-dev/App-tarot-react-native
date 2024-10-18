import React from "react";
import { Gltf } from "@react-three/drei/native";
import { Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Suspense, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Canvas } from "@react-three/fiber/native";
// Te aseguras que el componente sea compatible con Expo
import useControls from "r3f-native-orbitcontrols";
import { OrbitControls } from "@react-three/drei";
import { router } from "expo-router";
import Loader from "@/components/Loader";
import Trigger from "@/components/Trigger";
import sacerModel from "../assets/models/sacer.glb";

export const Sacer = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [orbitControls, events] = useControls();
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated style="light" />

      <View style={styles.modelContainer} {...events}>
        {loading && <Loader />}
        <Canvas>
          <OrbitControls enablePan={false} enableZoom={false} />
          <directionalLight position={[1, 0, 0]} args={["white", 2]} />
          <directionalLight position={[-1, 0, 0]} args={["white", 2]} />
          <directionalLight position={[0, 0, 1]} args={["white", 2]} />
          <directionalLight position={[0, 0, -1]} args={["white", 2]} />
          <directionalLight position={[0, 1, 0]} args={["white", 15]} />
          <directionalLight position={[0, -1, 0]} args={["white", 2]} />
          <Suspense fallback={<Trigger setLoading={setLoading} />}>
            <group>
              <Gltf src={sacerModel} />
            </group>
          </Suspense>
        </Canvas>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.textTitle}>Hello, worldddd!</Text>
        <Text style={styles.text}>This is a 3D model</Text>
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
  },
  button: {
    backgroundColor: "white",
    padding: 14,
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  textButton: {
    fontFamily: "Inter-Bold",
    fontSize: 18,
    color: "black",
  },
  modelContainer: {
    flex: 1,
  },
  textContainer: {
    gap: 4,
    marginVertical: 20,
  },
  text: {
    fontFamily: "Inter-Bold",
    fontSize: 18,
    color: "white",
  },
});

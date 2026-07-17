import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { BlurView } from "expo-blur";
import PagerView from "react-native-pager-view";
import { LinearGradient } from "expo-linear-gradient";
import { useAppStore } from "../stores/appStore";
import {
  usePlayerStore,
  XP_POR_REFLEXION,
} from "../stores/playerStore";
import { getArcano } from "../data/arcanos";

const coloresPagina = ["#7a89c2", "#e3d7ff", "#636b61"];

const Lectura = () => {
  const isResultado = useAppStore((s) => s.isResultado);
  const reiniciarTirada = useAppStore((s) => s.reiniciarTirada);
  const anotarEnDiario = usePlayerStore((s) => s.anotarEnDiario);
  const [nota, setNota] = useState("");

  // Muestra las cartas en el mismo orden en que fueron seleccionadas
  const cartas = isResultado.map((numero) => getArcano(numero));

  const guardarYCerrar = () => {
    if (nota.trim().length > 0) {
      anotarEnDiario(nota.trim());
    }
    reiniciarTirada();
  };

  return (
    <PagerView
      style={styles.container}
      initialPage={0}
      orientation={"horizontal"}
    >
      {cartas.map((arcano, index) => (
        <View
          key={arcano.numero}
          style={[
            styles.page,
            { backgroundColor: coloresPagina[index % coloresPagina.length] },
          ]}
        >
          <Text style={styles.titulo}>{arcano.nombre}</Text>
          <Image source={arcano.miniatura} style={styles.image} />
          <BlurView intensity={100} style={styles.cuadrotexto}>
            <Text style={styles.text}>{arcano.descripcion}</Text>
          </BlurView>
        </View>
      ))}

      {/* Página final: reflexión para el diario */}
      <KeyboardAvoidingView
        key="reflexion"
        style={[styles.page, styles.paginaReflexion]}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Text style={styles.tituloReflexion}>Tu reflexión</Text>
        <Text style={styles.subtituloReflexion}>
          ¿Qué te resonó de esta lectura? Escríbelo para tu diario
          (+{XP_POR_REFLEXION} XP)
        </Text>
        <TextInput
          style={styles.input}
          multiline
          placeholder="Hoy las cartas me hicieron pensar en..."
          placeholderTextColor="#8a8496"
          value={nota}
          onChangeText={setNota}
        />
        <Pressable onPress={guardarYCerrar} style={styles.botonContainer}>
          <LinearGradient
            colors={["#4c669f", "#3b5998", "#1a3f69"]}
            style={styles.boton}
          >
            <Text style={styles.botonTexto}>
              {nota.trim().length > 0
                ? "Guardar en el diario"
                : "Terminar sin escribir"}
            </Text>
          </LinearGradient>
        </Pressable>
      </KeyboardAvoidingView>
    </PagerView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
  },
  titulo: {
    fontSize: 42,
  },
  text: {
    fontSize: 18,
    padding: 16,
    textAlign: "center",
  },
  image: {
    height: 400,
    width: 200,
    resizeMode: "contain",
  },
  cuadrotexto: {
    width: 400,
    height: 250,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  paginaReflexion: {
    backgroundColor: "#12101d",
    paddingHorizontal: 24,
  },
  tituloReflexion: {
    color: "#f0e6d2",
    fontSize: 30,
    fontWeight: "bold",
  },
  subtituloReflexion: {
    color: "#bdb8c7",
    fontSize: 15,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 20,
  },
  input: {
    width: "100%",
    minHeight: 140,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#3d3654",
    backgroundColor: "rgba(40, 35, 60, 0.7)",
    color: "#e8e3f0",
    fontSize: 15,
    padding: 14,
    textAlignVertical: "top",
  },
  botonContainer: {
    width: 240,
    height: 52,
    marginTop: 24,
  },
  boton: {
    flex: 1,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "#cdac8d",
  },
  botonTexto: {
    color: "#dddae1",
    fontSize: 15,
  },
});

export default Lectura;

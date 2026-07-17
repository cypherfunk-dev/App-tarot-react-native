import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Modal,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { getArcano } from "../../data/arcanos";
import {
  usePlayerStore,
  nivelDesdeXp,
  NIVELES,
  cartaDelDia,
  hoyLocal,
  XP_POR_BENDICION,
} from "../../stores/playerStore";
import { Card } from "../../components/vistaArcano/Card";

const fondo = require("../../assets/images/inicio.jpg");

const Hoy = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const xp = usePlayerStore((s) => s.xp);
  const racha = usePlayerStore((s) => s.racha);
  const ultimoDiaBendicion = usePlayerStore((s) => s.ultimoDiaBendicion);
  const reclamarBendicion = usePlayerStore((s) => s.reclamarBendicion);

  const nivel = nivelDesdeXp(xp);
  const siguienteNivel = NIVELES[NIVELES.indexOf(nivel) + 1];
  const numeroDelDia = cartaDelDia();
  const arcano = getArcano(numeroDelDia);
  const bendicionDisponible = ultimoDiaBendicion !== hoyLocal();

  // Reto de reflexión derivado de las palabras clave del arcano del día
  const palabraDelDia =
    arcano.palabrasClave[new Date().getDate() % arcano.palabrasClave.length];

  return (
    <ImageBackground source={fondo} style={styles.fondo} resizeMode="cover">
      <View style={styles.overlay}>
        <SafeAreaView style={styles.safe}>
          <ScrollView contentContainerStyle={styles.contenido}>
            {/* Progreso del jugador */}
            <View style={styles.panelJugador}>
              <Text style={styles.nivel}>{nivel.nombre}</Text>
              <Text style={styles.statLinea}>
                ✨ {xp} XP
                {siguienteNivel
                  ? `  ·  ${siguienteNivel.xpMinimo - xp} para ${siguienteNivel.nombre}`
                  : "  ·  nivel máximo"}
              </Text>
              <Text style={styles.statLinea}>
                🔥 Racha: {racha} {racha === 1 ? "día" : "días"}
              </Text>
            </View>

            {/* Carta del día */}
            <Text style={styles.seccion}>El arcano de hoy te espera</Text>
            <Pressable
              style={styles.carta}
              onPress={() => setModalVisible(true)}
            >
              <Image
                source={arcano.miniatura}
                style={styles.miniatura}
                contentFit="cover"
                transition={600}
              />
            </Pressable>
            <Text style={styles.nombreArcano}>{arcano.nombre}</Text>
            <Text style={styles.palabras}>
              {arcano.palabrasClave.join(" · ")}
            </Text>

            {/* Bendición diaria */}
            <Pressable
              onPress={reclamarBendicion}
              disabled={!bendicionDisponible}
              style={styles.botonContainer}
            >
              <LinearGradient
                colors={
                  bendicionDisponible
                    ? ["#4c669f", "#3b5998", "#1a3f69"]
                    : ["#555", "#444", "#333"]
                }
                style={styles.boton}
              >
                <Text style={styles.botonTexto}>
                  {bendicionDisponible
                    ? `Recibir bendición (+${XP_POR_BENDICION} XP)`
                    : "Bendición recibida ✓"}
                </Text>
              </LinearGradient>
            </Pressable>

            {/* Reto del día */}
            <View style={styles.reto}>
              <Text style={styles.retoTitulo}>Reto del día</Text>
              <Text style={styles.retoTexto}>
                {arcano.nombre} te propone: dedica unos minutos a reflexionar
                sobre la palabra «{palabraDelDia}» y qué lugar ocupa hoy en tu
                vida.
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>

      {/* Ficha completa del arcano del día */}
      <Modal
        visible={modalVisible}
        presentationStyle="overFullScreen"
        onRequestClose={() => setModalVisible(false)}
      >
        <Card arcane={numeroDelDia} />
      </Modal>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  fondo: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.65)",
  },
  safe: {
    flex: 1,
  },
  contenido: {
    alignItems: "center",
    paddingBottom: 40,
  },
  panelJugador: {
    width: "90%",
    marginTop: 10,
    padding: 14,
    borderRadius: 16,
    backgroundColor: "rgba(20, 20, 40, 0.8)",
    borderWidth: 1,
    borderColor: "#cdac8d",
  },
  nivel: {
    color: "#f0e6d2",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  statLinea: {
    color: "#dddae1",
    fontSize: 14,
    textAlign: "center",
    marginTop: 4,
  },
  seccion: {
    color: "#f0e6d2",
    fontSize: 18,
    marginTop: 24,
    marginBottom: 12,
  },
  carta: {
    width: 160,
    height: 240,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "#cdac8d",
  },
  miniatura: {
    width: "100%",
    height: "100%",
  },
  nombreArcano: {
    color: "#f0e6d2",
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 12,
  },
  palabras: {
    color: "#bdb8c7",
    fontSize: 14,
    fontStyle: "italic",
    marginTop: 4,
  },
  botonContainer: {
    width: 260,
    height: 52,
    marginTop: 20,
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
  reto: {
    width: "90%",
    marginTop: 24,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "rgba(40, 25, 60, 0.85)",
    borderWidth: 1,
    borderColor: "#7a89c2",
  },
  retoTitulo: {
    color: "#f0e6d2",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  retoTexto: {
    color: "#dddae1",
    fontSize: 14,
    lineHeight: 21,
  },
});

export default Hoy;

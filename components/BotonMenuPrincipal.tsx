import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface BotonMenuPrincipalProps {
  nombre: string;
  ruta: string;
}

const BotonMenuPrincipal: React.FC<BotonMenuPrincipalProps> = ({
  nombre,
  ruta,
}) => {
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={styles.button}
        onPress={() => alert("You pressed a button.")}
      >
        <LinearGradient
          // Button Linear Gradient
          colors={["#4c669f", "#3b5998", "#1a3f69"]}
          style={styles.button}
        >
          <Text style={styles.buttonLabel}>{nombre}</Text>
        </LinearGradient>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: 220,
    height: 68,
    marginHorizontal: 20,
    justifyContent: "center",
    padding: 3,
    flexWrap: "nowrap",
  },
  button: {
    borderRadius: 30,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderWidth: 1.5, // Ancho del borde
    borderColor: "#cdac8d", // Color del borde
  },
  gradient: {
    borderRadius: 30,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonLabel: {
    color: "#dddae1",
    fontSize: 16,
  },
});

export default BotonMenuPrincipal;

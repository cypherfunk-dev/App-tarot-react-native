import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const BotonNavModelo = () => {
  return (
    <View style={styles.navBar}>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? "#DDDDDD" : "transparent" },
        ]}
        onPress={() => console.log("Button 1 pressed")}
      >
        <View style={styles.buttonContent}>
          <Icon name="info" size={20} color="#000" />
          <Text style={styles.buttonText}>Info</Text>
        </View>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? "#DDDDDD" : "transparent" },
        ]}
        onPress={() => console.log("Button 2 pressed")}
      >
        <View style={styles.buttonContent}>
          <Icon name="map" size={20} color="#000" />
          <Text style={styles.buttonText}>Correspondencias</Text>
        </View>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? "#DDDDDD" : "transparent" },
        ]}
        onPress={() => console.log("Button 3 pressed")}
      >
        <View style={styles.buttonContent}>
          <Icon name="th" size={20} color="#000" />
          <Text style={styles.buttonText}>Mazos</Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "column", // Cambiado de "row" a "column"
    justifyContent: "space-around",
    alignItems: "center",
    width: 60, // Ajusta el ancho según sea necesario
    backgroundColor: "#f8f8f8",
    borderRightWidth: 1, // Cambiado de borderBottomWidth a borderRightWidth
    borderRightColor: "#e7e7e7", // Cambiado de borderBottomColor a borderRightColor
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10, // Añadido para dar espacio entre los botones
  },
  buttonContent: {
    alignItems: "center",
  },
  buttonText: {
    fontSize: 12,
    color: "#000",
  },
});

export default BotonNavModelo;
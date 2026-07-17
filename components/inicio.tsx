import React from "react";
import { Image, StyleSheet } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  imge: {
    height: "100%",
  },
});

const Inicio = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Image
          style={styles.imge}
          source={require("../assets/images/inicio.jpg")}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default Inicio;

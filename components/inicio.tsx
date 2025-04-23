import BotonMenuPrincipal from "@/components/BotonMenuPrincipal";
import React from "react";
import { Image, StyleSheet, View } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    aspectRatio: 1,
  },
  imge: {
    height: "100%",
  },
  botoncontainer: {
    flexDirection: "row",
    justifyContent: "space-around",
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
      {/* <View style={styles.botoncontainer}>
        <BotonMenuPrincipal nombre="Arcanos" ruta="arcanos" />
        <BotonMenuPrincipal nombre="Tirada" ruta="tirada" />
      </View>

      <View style={styles.botoncontainer}>
        <BotonMenuPrincipal nombre="Conversar" ruta="informacion" />
        <BotonMenuPrincipal nombre="Explorar" ruta="explorar" />
      </View> */}
    </SafeAreaProvider>
  );
};

export default Inicio;

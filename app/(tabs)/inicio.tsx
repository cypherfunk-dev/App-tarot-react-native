import BotonMenuPrincipal from "@/components/BotonMenuPrincipal";
import MenuPrincipal from "@/components/MenuPrincipal";
import React from "react";
import { Image, StyleSheet } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "95%",
    aspectRatio: 1,
  },
  imge: {
    width: "50%",
    height: "50%",
  },
});

const Inicio = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Image
          style={styles.imge}
          source={require("../../assets/images/inicio.jpg")}
        />
      </SafeAreaView>
      <BotonMenuPrincipal nombre="Informacion" ruta="Informacion" />
      <BotonMenuPrincipal nombre="Tirada" ruta="Tirada" />
    </SafeAreaProvider>
  );
};
export default Inicio;

import { View, Text, StyleSheet } from "react-native";
import data from "../../data/arcanes.json";

export const Info = (arcane) => {
  const arcaneData = data[arcane.arcane];
  return (
    <View style={styles.textContainer}>
      <Text className="p-4 text-center text-2xl">{arcaneData.nombre}</Text>
      <Text className="p-4 text-xl">{arcaneData.descripcion}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    flexGrow: 1,
    marginHorizontal: 15,
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
  },
});
//   textTitle: {
//     padding: 30,
//     fontFamily: "Inter-Bold",
//     fontSize: 24,
//     color: "black",
//     textAlign: "center",
//   },
//   text: {
//     textAlign: "left",
//     fontFamily: "Inter-Light",
//     fontSize: 21,
//     color: "black",
//     lineHeight: 25,
//   },
// });

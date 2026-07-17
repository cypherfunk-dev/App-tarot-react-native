import { View, Text, StyleSheet } from "react-native";
import { getArcano } from "../../data/arcanos";

interface InfoProps {
  arcane: number;
}

export const Info = ({ arcane }: InfoProps) => {
  const arcano = getArcano(arcane);
  return (
    <View style={styles.textContainer}>
      <Text className="p-4 text-center text-2xl">{arcano.nombre}</Text>
      <Text className="p-4 text-xl">{arcano.descripcion}</Text>
      <Text className="p-4 text-center text-base italic">
        {arcano.palabrasClave.join(" · ")}
      </Text>
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

import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { getArcano } from "../../data/arcanos";
import { usePlayerStore, RegistroTirada } from "../../stores/playerStore";

const formatearFecha = (iso: string) =>
  new Date(iso).toLocaleDateString("es", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const EntradaDiario = ({ registro }: { registro: RegistroTirada }) => {
  const cartas = registro.cartas.map((n) => getArcano(n));
  return (
    <View style={styles.entrada}>
      <Text style={styles.fecha}>{formatearFecha(registro.fecha)}</Text>
      <View style={styles.cartasFila}>
        {cartas.map((arcano) => (
          <View key={arcano.numero} style={styles.cartaItem}>
            <Image
              source={arcano.miniatura}
              style={styles.miniatura}
              contentFit="cover"
            />
            <Text style={styles.nombreCarta} numberOfLines={1}>
              {arcano.nombre}
            </Text>
          </View>
        ))}
      </View>
      {registro.nota ? (
        <Text style={styles.nota}>“{registro.nota}”</Text>
      ) : (
        <Text style={styles.sinNota}>Sin reflexión escrita</Text>
      )}
    </View>
  );
};

const Diario = () => {
  const historial = usePlayerStore((s) => s.historial);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titulo}>Diario del viajero</Text>
      {historial.length === 0 ? (
        <View style={styles.vacio}>
          <Text style={styles.vacioTexto}>
            Aún no hay tiradas registradas.{"\n\n"}Haz tu primera tirada y
            escribe qué te resonó: tus reflexiones se guardarán aquí.
          </Text>
        </View>
      ) : (
        <FlatList
          data={historial}
          keyExtractor={(item) => item.fecha}
          renderItem={({ item }) => <EntradaDiario registro={item} />}
          contentContainerStyle={styles.lista}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#12101d",
  },
  titulo: {
    color: "#f0e6d2",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 14,
  },
  lista: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  vacio: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  vacioTexto: {
    color: "#bdb8c7",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
  },
  entrada: {
    backgroundColor: "rgba(40, 35, 60, 0.7)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#3d3654",
    padding: 14,
    marginBottom: 14,
  },
  fecha: {
    color: "#cdac8d",
    fontSize: 13,
    marginBottom: 10,
    textTransform: "capitalize",
  },
  cartasFila: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  cartaItem: {
    alignItems: "center",
    width: 90,
  },
  miniatura: {
    width: 70,
    height: 105,
    borderRadius: 6,
  },
  nombreCarta: {
    color: "#dddae1",
    fontSize: 11,
    marginTop: 4,
  },
  nota: {
    color: "#e8e3f0",
    fontSize: 14,
    fontStyle: "italic",
    marginTop: 12,
    lineHeight: 20,
  },
  sinNota: {
    color: "#6f6a80",
    fontSize: 13,
    fontStyle: "italic",
    marginTop: 12,
  },
});

export default Diario;

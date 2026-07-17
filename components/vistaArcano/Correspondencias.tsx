import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { getArcano } from "../../data/arcanos";

interface CorrespondenciasProps {
  arcane: number;
}

const Correspondencias: React.FC<CorrespondenciasProps> = ({ arcane }) => {
  const arcaneinfo = getArcano(arcane).correspondencias;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Correspondencias</Text>
        </View>
        {arcaneinfo.map((info, index) => {
          const key = Object.keys(info)[0];
          const value = info[key];
          return (
            <View
              key={key}
              style={[
                styles.tableRow,
                index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd,
              ]}
            >
              <Text style={styles.tableCell}>{key}</Text>
              <Text style={styles.tableCell}>{value}</Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginHorizontal: 15,
    padding: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
  },
  table: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    overflow: "hidden",
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#007bff",
    padding: 10,
  },
  tableHeaderText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tableRowEven: {
    backgroundColor: "#fff",
  },
  tableRowOdd: {
    backgroundColor: "#e6e6e6",
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
  },
});

export default Correspondencias;

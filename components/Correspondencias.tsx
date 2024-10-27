import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const Correspondencias: React.FC = () => {
  const rows = [
    { key: "1", title: "Mago", description: "Ingenioso" },
    { key: "2", title: "La alta sacerdotisa", description: "Erudita" },
    { key: "3", title: "Mago", description: "Ingenioso" },
    { key: "4", title: "La alta sacerdotisa", description: "Erudita" },
    { key: "5", title: "Mago", description: "Ingenioso" },
    { key: "6", title: "La alta sacerdotisa", description: "Erudita" },
    { key: "7", title: "Mago", description: "Ingenioso" },
    { key: "8", title: "La alta sacerdotisa", description: "Erudita" },
    { key: "9", title: "Mago", description: "Ingenioso" },
    { key: "10", title: "La alta sacerdotisa", description: "Erudita" },
    { key: "11", title: "Mago", description: "Ingenioso" },
    { key: "12", title: "La alta sacerdotisa", description: "Erudita" },
    { key: "13", title: "Mago", description: "Ingenioso" },
    { key: "14", title: "La alta sacerdotisa", description: "Erudita" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Correspondencias</Text>
        </View>
        {rows.map((row, index) => (
          <View
            key={row.key}
            style={[
              styles.tableRow,
              index % 2 === 0 ? styles.tableRowEven : styles.tableRowOdd,
            ]}
          >
            <Text style={styles.tableCell}>{row.title}</Text>
            <Text style={styles.tableCell}>{row.description}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
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

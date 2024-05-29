import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Button, StyleSheet } from "react-native";
import axios from "axios";
import BaseURL from "../components/BaseURL";

const GateList = ({ navigation }) => {
  const [gates, setGates] = useState([]);
  const baseURL = BaseURL()


  useEffect(() => {
    axios
      .get(`${baseURL}gates/`)
      .then((response) => {
        setGates(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`${baseURL}gates/${id}/`)
      .then(() => {
        setGates(gates.filter((gate) => gate.id !== id));
      })
      .catch((error) => console.error(error));
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.itemText}>
        {item.name} - {item.gate_type}
      </Text>
      <Text style={styles.itemText}>
        Guards: {item.number_of_guards} | Shift Time: {item.shift_time}
      </Text>
      <Text style={styles.itemText}>
        Start Time: {item.start_time} - End Time: {item.end_time}
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Edit"
          onPress={() => navigation.navigate("EditGateForm", { gateId: item.id })}
          color="#007bff" // Custom button color
        />
        <Button
          title="Delete"
          onPress={() => handleDelete(item.id)}
          color="#dc3545" // Custom button color
        />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gate List</Text>
      <FlatList
        data={gates}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#ffffff", // White background color
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000000", // Black text color
  },
  item: {
    backgroundColor: "#f8f9fa", // Light gray background color for items
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ced4da", // Border color
  },
  itemText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333333", // Dark text color
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});

export default GateList;

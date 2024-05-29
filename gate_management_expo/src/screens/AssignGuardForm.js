import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { Picker } from "@react-native-picker/picker";
import BaseURL from "../components/BaseURL";
const AssignGuardForm = ({ navigation }) => {
  const [uniqueCode, setUniqueCode] = useState("");
  const [gateId, setGateId] = useState("");
  const [gates, setGates] = useState([]);
  const baseURL = BaseURL();

  useEffect(() => {
    // Fetch gates from the API
    axios
      .get(`${baseURL}gates/`)
      .then((response) => setGates(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleAssign = () => {
    axios
      .post(`${baseURL}guard-assignments/`, {
        unique_code: uniqueCode,
        gate: gateId, // Assuming gateId is the ID of the selected gate
      })
      .then((response) => {
        console.log(response.data);
        Alert.alert("Success", "Guard assigned successfully!");
        navigation.navigate("GuardAssignmentList");
      })
      .catch((error) => {
        console.error(error.response.data);
        // Handle error, e.g., show an error message
        Alert.alert("Error", error.response.data.error || "An error occurred!");
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Assign Guard</Text>
      <TextInput
        style={styles.input}
        placeholder="Unique Code"
        value={uniqueCode}
        onChangeText={setUniqueCode}
      />
      <Picker
        selectedValue={gateId}
        style={styles.input}
        onValueChange={(itemValue) => setGateId(itemValue)}
      >
        {gates.map((gate) => (
          <Picker.Item key={gate.id} label={gate.name} value={gate.id} />
        ))}
      </Picker>
      <Button title="Assign" onPress={handleAssign} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
});

export default AssignGuardForm;

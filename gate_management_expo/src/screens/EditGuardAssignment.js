import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker'; // Import Picker from @react-native-picker/picker

const EditGuardAssignment = ({ route, navigation }) => {
  const { id } = route.params;
  const [uniqueCode, setUniqueCode] = useState('');
  const [gateId, setGateId] = useState('');
  const [gates, setGates] = useState([]);

  useEffect(() => {
    fetchAssignmentDetails();
    fetchGates();
  }, []);

  const fetchAssignmentDetails = () => {
    axios.get(`http://192.168.0.155:8000/api/guard-assignments/${id}/`)
      .then(response => {
        setUniqueCode(response.data.unique_code);
        setGateId(response.data.gate);
      })
      .catch(error => console.error(error));
  };

  const fetchGates = () => {
    axios.get('http://192.168.0.155:8000/api/gates/')
      .then(response => setGates(response.data))
      .catch(error => console.error(error));
  };

  const handleUpdate = () => {
    axios.put(`http://192.168.0.155:8000/api/guard-assignments/${id}/`, {
      unique_code: uniqueCode,
      gate: gateId,
    })
    .then(() => {
      Alert.alert('Success', 'Guard assignment updated successfully!');
      navigation.goBack(); // Navigate back to the previous screen after updating
    })
    .catch(error => console.error(error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Guard Assignment</Text>
      <TextInput
        style={styles.input}
        placeholder="Unique Code"
        value={uniqueCode}
        onChangeText={setUniqueCode}
      />
      <Text style={styles.label}>Select Gate:</Text>
      <Picker
        selectedValue={gateId}
        style={styles.input}
        onValueChange={(itemValue) => setGateId(itemValue)}
      >
        {gates.map((gate) => (
          <Picker.Item key={gate.id} label={gate.name} value={gate.id} />
        ))}
      </Picker>
      <Button title="Update" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default EditGuardAssignment;

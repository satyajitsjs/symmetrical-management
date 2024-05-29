import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

const GuardAssignmentList = ({ navigation }) => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = () => {
    axios.get('http://98.70.76.242:8000/api/guard-assignments/')
      .then(response => setAssignments(response.data))
      .catch(error => console.error(error));
  };

  const handleDelete = (id) => {
    axios.delete(`http://98.70.76.242:8000/api/guard-assignments/${id}/`)
      .then(() => {
        Alert.alert('Success', 'Guard assignment deleted successfully!');
        fetchAssignments(); // Refresh the list after deletion
      })
      .catch(error => console.error(error));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate('EditGuardAssignment', { id: item.id })}
    >
      <Text>Guard Code: {item.unique_code} - Gate: {item.gate.name}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(item.id)}>
          <Text>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  const handleEdit = (id) => {
    navigation.navigate('EditGuardAssignment', { id });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guard Assignment List</Text>
      <FlatList
        data={assignments}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
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
  item: {
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  editButton: {
    backgroundColor: 'lightblue',
    padding: 8,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: 'lightcoral',
    padding: 8,
    borderRadius: 5,
  },
});

export default GuardAssignmentList;

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const GateManagement = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gate Management</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Add Gate"
          onPress={() => navigation.navigate('AddGateForm')}
          color="#007bff" // Custom button color
        />
        <Button
          title="View Gates"
          onPress={() => navigation.navigate('GateList')}
          color="#28a745" // Custom button color
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // White background color
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000000', // Black text color
  },
  buttonContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default GateManagement;

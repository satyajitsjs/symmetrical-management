import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const GuardAssignment = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Guard Assignment</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Assign Guard"
          onPress={() => navigation.navigate('AssignGuardForm')}
          color="#007bff" // Custom button color
        />
        <Button
          title="View Assignments"
          onPress={() => navigation.navigate('GuardAssignmentList')}
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

export default GuardAssignment;

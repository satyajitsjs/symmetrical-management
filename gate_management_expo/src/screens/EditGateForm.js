import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Platform, TouchableOpacity } from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";

const EditGateForm = ({ route, navigation }) => {
  const { gateId } = route.params;
  const [gateName, setGateName] = useState("");
  const [numberOfGuards, setNumberOfGuards] = useState("");
  const [gateType, setGateType] = useState(""); // Default value ""
  const [shiftTime, setShiftTime] = useState(""); // Default value ""
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  useEffect(() => {
    axios
      .get(`http://98.70.76.242:8000/api/gates/${gateId}/`)
      .then((response) => {
        const gate = response.data;
        setGateName(gate.name);
        setNumberOfGuards(String(gate.number_of_guards)); // Convert to string for TextInput
        setGateType(gate.gate_type);
        setShiftTime(gate.shift_time);
        setStartTime(new Date(`1970-01-01T${gate.start_time}Z`));
        setEndTime(new Date(`1970-01-01T${gate.end_time}Z`));
      })
      .catch((error) => console.error(error));
  }, [gateId]);

  const handleStartTimeChange = (event, selectedTime) => {
    setShowStartTimePicker(Platform.OS === "ios");
    if (selectedTime) {
      setStartTime(selectedTime);
    }
  };

  const handleEndTimeChange = (event, selectedTime) => {
    setShowEndTimePicker(Platform.OS === "ios");
    if (selectedTime) {
      setEndTime(selectedTime);
    }
  };

  const handleSubmit = () => {
    axios
      .put(`http://98.70.76.242:8000/api/gates/${gateId}/`, {
        name: gateName,
        number_of_guards: parseInt(numberOfGuards), // Convert back to integer for the API
        gate_type: gateType,
        shift_time: shiftTime,
        start_time: startTime.toTimeString().split(" ")[0],
        end_time: endTime.toTimeString().split(" ")[0],
      })
      .then((response) => {
        navigation.goBack();
      })
      .catch((error) => console.error(error));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Gate</Text>
      <TextInput
        style={styles.input}
        placeholder="Gate Name"
        value={gateName}
        onChangeText={setGateName}
      />
      <TextInput
        style={styles.input}
        placeholder="Number of Guards"
        keyboardType="numeric"
        value={numberOfGuards}
        onChangeText={setNumberOfGuards}
        textAlignVertical="center" // Ensure text is fully visible
      />
      <Picker
        selectedValue={gateType}
        style={styles.input}
        onValueChange={(itemValue) => setGateType(itemValue)}
      >
        <Picker.Item label="Entry" value="Entry" />
        <Picker.Item label="Exit" value="Exit" />
        <Picker.Item label="Both" value="Both" />
      </Picker>
      <Picker
        selectedValue={shiftTime}
        style={styles.input}
        onValueChange={(itemValue) => setShiftTime(itemValue)}
      >
        <Picker.Item label="24 hours" value="24 hours" />
        <Picker.Item label="12 hours" value="12 hours" />
        <Picker.Item label="8 hours" value="8 hours" />
      </Picker>
      {shiftTime !== "24 hours" && (
        <>
          <TouchableOpacity
            onPress={() => setShowStartTimePicker(true)}
            style={styles.input}
          >
            <Text>Start Time: {startTime.toLocaleTimeString()}</Text>
          </TouchableOpacity>
          {showStartTimePicker && (
            <DateTimePicker
              value={startTime}
              mode="time"
              display="default"
              onChange={handleStartTimeChange}
            />
          )}
          <TouchableOpacity
            onPress={() => setShowEndTimePicker(true)}
            style={styles.input}
          >
            <Text>End Time: {endTime.toLocaleTimeString()}</Text>
          </TouchableOpacity>
          {showEndTimePicker && (
            <DateTimePicker
              value={endTime}
              mode="time"
              display="default"
              onChange={handleEndTimeChange}
            />
          )}
        </>
      )}
      <Button title="Save" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
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

export default EditGateForm;

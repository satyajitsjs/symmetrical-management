import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import axios from "axios";
import BaseURL from "../components/BaseURL";

const AddGateForm = ({ navigation }) => {
  const [gateName, setGateName] = useState("");
  const [numberOfGuards, setNumberOfGuards] = useState("");
  const [gateType, setGateType] = useState("");
  const [shiftTime, setShiftTime] = useState("");
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const baseURL = BaseURL();

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
    const newGate = {
      name: gateName,
      number_of_guards: numberOfGuards,
      gate_type: gateType,
      shift_time: shiftTime,
      start_time: startTime.toTimeString().split(" ")[0],
      end_time: endTime.toTimeString().split(" ")[0],
    };

    axios
      .post(`${baseURL}gates/`, newGate)
      .then((response) => {
        navigation.navigate("GateList");
      })
      .catch((error) => {
        if (error.response) {
          console.error("Error adding gate:", error.response.data);
        } else {
          console.error("Error adding gate:", error.message);
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Gate</Text>
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
      />
      <Picker
        selectedValue={gateType}
        style={styles.input}
        onValueChange={(itemValue) => setGateType(itemValue)}
      >
        <Picker.Item label="Select Gate Type" value="" enabled={false} />
        <Picker.Item label="Entry" value="Entry" />
        <Picker.Item label="Exit" value="Exit" />
        <Picker.Item label="Both" value="Both" />
      </Picker>
      <Picker
        selectedValue={shiftTime}
        style={styles.input}
        onValueChange={(itemValue) => setShiftTime(itemValue)}
      >
        <Picker.Item label="Select Shift Time" value="" enabled={false} />
        <Picker.Item label="24 hours" value="24 hours" />
        <Picker.Item label="12 hours" value="12 hours" />
        <Picker.Item label="8 hours" value="8 hours" />
      </Picker>
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
      <Button title="Submit" onPress={handleSubmit} />
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
  type: {
    fontSize: 18,
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

export default AddGateForm;

import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const HomePage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Gate Management App</Text>
      <View style={styles.buttonContainer}>
        <Button
          title="Gate Management"
          onPress={() => navigation.navigate("GateManagement")}
          color="#007bff" // Custom button color
        />
        <Button
          title="Guard Assignment"
          onPress={() => navigation.navigate("GuardAssignment")}
          color="#28a745" // Custom button color
        />
      </View>
      <View>
        <Button
          title="Shopping"
          onPress={() => navigation.navigate("Shoping")}
          color="#e74c3c"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff", // White background color
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#000000", // Black text color
  },
  buttonContainer: {
    marginBottom:2,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default HomePage;

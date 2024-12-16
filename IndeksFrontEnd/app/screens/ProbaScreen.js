import React, { useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";

const ProbaScreen = () => {
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Do you like React Native?</Text>
      <Switch
        trackColor={{ false: "#767577", true: "#81b0ff" }}
        thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <Text style={styles.statusText}>
        Is Switch selected: {isEnabled ? "👍" : "👎"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e6e6e6",
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  statusText: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default ProbaScreen;

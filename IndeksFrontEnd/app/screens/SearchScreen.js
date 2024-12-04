import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const SearchScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color="#013868" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Potražite"
            value={searchText}
            onChangeText={setSearchText}
            autoFocus={true} // Automatski prikazuje tastaturu
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C7C7C7",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#C7C7C7",
    paddingTop: 40,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#aaa",
  },
  input: {
    flex: 1,
    marginLeft: 10,
    height: 40,
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 5,
  },
});

export default SearchScreen;

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Sidebar from "../components/SidebarComponent";
import HeaderComponent from "../components/HeaderComponent";
import { useNavigation } from "@react-navigation/native";

const AddingNewInstructionOfferScreen = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const [selectedSubject, setSelectedSubject] = useState(""); // Izabrani predmet
  const [description, setDescription] = useState(""); // Tekst opisa
  const navigation = useNavigation();

  const subjects = [
    "Matematika 1",
    "Matematika 2",
    "Programiranje 1",
    "Programiranje 2",
    "Fizika 1",
    "Fizika 2",
    "Elektronika",
  ]; // Lista predmeta

  const handleAdd = () => {
    if (!selectedSubject || !description) {
      console.error("Popunite sve podatke pre dodavanja.");
      return;
    }
    // Logika za obradu unosa - ovde možete dodati HTTP zahtev ili navigaciju
    console.log("Dodavanje ponude:", { selectedSubject, description });
  };

  return (
    <View style={styles.container}>
      <HeaderComponent toggleSidebar={toggleSidebar} />
      <View style={styles.inputContainer}>
        <Text style={styles.headerTitle}>Nova ponuda</Text>

        {/* Picker za odabir predmeta */}
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedSubject}
            onValueChange={(itemValue) => setSelectedSubject(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Predmet" value="" />
            {subjects.map((subject, index) => (
              <Picker.Item key={index} label={subject} value={subject} />
            ))}
          </Picker>
        </View>

        {/* TextInput za unos opisa */}
        <TextInput
          style={[styles.input, { height: 120 }]} // Dodavanje veće visine
          placeholder="Opis"
          value={description}
          onChangeText={setDescription}
          multiline={true} // Omogućava višeredni unos
          textAlignVertical="top" // Tekst počinje od vrha
        />
      </View>

      {/* Dugme za potvrdu */}
      <TouchableOpacity style={styles.button} onPress={handleAdd}>
        <Text style={styles.buttonText}>Dodaj</Text>
      </TouchableOpacity>
      <Sidebar visible={isSidebarVisible} onClose={toggleSidebar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e6e6e6",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#013868",
    textAlign: "center",
    marginVertical: 15,
  },
  inputContainer: {
    paddingHorizontal: 20,
  },
  pickerWrapper: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  picker: {
    height: 55,
    color: "#013868",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    fontSize: 16,
    color: "#013868",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
    height: 120, // Povećava visinu za višeredni unos
    textAlignVertical: "top", // Poravnava tekst ka vrhu
  },
  button: {
    backgroundColor: "#013868",
    borderRadius: 8,
    marginHorizontal: 100,
    marginTop: 20,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default AddingNewInstructionOfferScreen;

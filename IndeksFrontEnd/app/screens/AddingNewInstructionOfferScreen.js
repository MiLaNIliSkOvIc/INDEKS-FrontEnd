import React, { useState, useEffect, useContext } from "react";
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
import HttpService from "../services/HttpService";
import { useUser } from "../hooks/useUser";

const AddingNewInstructionOfferScreen = () => {
  const user = useUser();
  const studentAccountId = user?.accountId;
  const [data, setData] = useState([]);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [description, setDescription] = useState("");
  const navigation = useNavigation();
  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await HttpService.get("subject");
        console.log(response);
        if (response) {
          setData(response);
        } else {
          console.error("Nema dostupnih podataka za predmete.");
        }
      } catch (error) {
        console.error("Greška prilikom učitavanja predmeta:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAdd = async () => {
    if (!selectedSubject || !description) {
      console.error("Popunite sve podatke pre dodavanja.");
      return;
    }
    if (!studentAccountId) {
      console.error("Korisnički ID nije pronađen. Proverite autentifikaciju.");
      return;
    }

    try {
      const subjectId = data.find(
        (subject) => subject.name === selectedSubject
      )?.id;
      console.log("SUBJECT ID:", subjectId);
      console.log(subjectId);

      if (!subjectId) {
        console.error("Predmet nije pronađen.");
        return;
      }

      const body = {
        description,
        subjectId,
        studentAccountId,
      };
      console.log("BODY:", body);
      const response = await HttpService.create("tutoringOffer", body);
      console.log("RESPONSE", response);

      navigation.goBack();
    } catch (error) {
      console.error("Greška pri dodavanju ponude:", error);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderComponent toggleSidebar={toggleSidebar} />
      <View style={styles.inputContainer}>
        <Text style={styles.headerTitle}>Nova ponuda</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedSubject}
            onValueChange={(itemValue) => setSelectedSubject(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Predmet" value="" />
            {data.map((subject) => (
              <Picker.Item
                key={subject.id}
                label={subject.name}
                value={subject.name}
              />
            ))}
          </Picker>
        </View>

        {/* TextInput za unos opisa */}
        <TextInput
          style={[styles.input, { height: 120 }]}
          placeholder="Opis"
          value={description}
          onChangeText={setDescription}
          multiline={true}
          textAlignVertical="top"
        />
      </View>
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
    height: 120,
    textAlignVertical: "top",
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

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert } from "react-native";
import Sidebar from "../components/SidebarComponent";
import HeaderComponent from "../components/HeaderComponent";
import InstructionItemComponent from "../components/InstructionItemComponent";
import HttpService from "../services/HttpService";
import Icon from "react-native-vector-icons/FontAwesome";

const InstructionsListScreen = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [instructions, setInstructions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handleCoursePress = (course) => {
    console.log("Selected course:", course);
  };

  const fetchInstructions = async () => {
    try {
      setIsLoading(true);
      const response = await HttpService.get("tutoringOffer/details");
   //   console.log(response)
      if (response.error) {
      //  throw new Error(response.message || "Failed to fetch instructions");
      }
      setInstructions(response);
      console.log("CCCCCCCCCCCCC")
      console.log(instructions)
    } catch (err) {
      console.error(err);
     // setError(err.message);
      //Alert.alert("Error", err.message || "An error occurred while fetching data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchInstructions();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#013868" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Failed to load instructions: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderComponent
        leftIcon="bars"
        leftAction={toggleSidebar}
        centerLogo={require("../assets/images/logo.png")}
        centerText="Indeks"
      />

      <Text style={styles.title}>Instrukcije</Text>

      <FlatList
        data={instructions}
        renderItem={({ item }) => (
          <InstructionItemComponent
            navigate={"Instruction"}
            id={item.tutoringOfferId}
            course={item.subjectName}
            teacher={item.instructorName}
            rating={item.averageRating}
            icon="pencil"
            onPress={() => handleCoursePress(item.course)}
          />
        )}
        keyExtractor={(item) => item.tutoringOfferId.toString()}
      />

      <Sidebar visible={isSidebarVisible} onClose={toggleSidebar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c7c7c7",
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#013868",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c7c7c7",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#c7c7c7",
  },
  errorText: {
    color: "red",
    fontSize: 16,
  },
});

export default InstructionsListScreen;

import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Sidebar from "../components/SidebarComponent";
import Icon from "react-native-vector-icons/FontAwesome";
import HeaderComponent from "../components/HeaderComponent";

// Podaci za dokumente
const documents = [
  { id: "1", icon: "file-text", title: "Priručnik za vežbe" },
  { id: "2", icon: "file-text", title: "Skripta za predavanja" },
  { id: "3", icon: "file-text", title: "Zbirka zadataka" },
  { id: "4", icon: "file-text", title: "Prezentacije" },
  { id: "5", icon: "file-text", title: "Priručnik za vežbe" },
  { id: "6", icon: "file-text", title: "Skripta za predavanja" },
  { id: "7", icon: "file-text", title: "Zbirka zadataka" },
  { id: "8", icon: "file-text", title: "Prezentacije" },
  { id: "9", icon: "file-text", title: "Priručnik za vežbe" },
  { id: "10", icon: "file-text", title: "Skripta za predavanja" },
  { id: "11", icon: "file-text", title: "Zbirka zadataka" },
  { id: "12", icon: "file-text", title: "Prezentacije" },
];

const MaterialsSubjectItemsScreen = ({ route, navigation }) => {
  const { subjectTitle } = route.params; // Dobijanje naziva predmeta iz navigacije
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handleDownload = (documentTitle) => {
    console.log(`Downloading: ${documentTitle}`);
    // Ovde možete dodati funkcionalnost za preuzimanje fajla.
  };

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <View style={styles.iconContainer}>
        <Icon name={item.icon} size={22} color="#013868" />
      </View>
      <Text style={styles.itemText}>{item.title}</Text>
      <TouchableOpacity
        style={styles.downloadButton}
        onPress={() => handleDownload(item.title)}
      >
        <Icon name="download" size={20} color="#013868" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <HeaderComponent
        leftIcon="arrow-left"
        leftAction={() => navigation.goBack()}
        centerLogo={require("../assets/images/logo.png")}
        centerText="Indeks"
      />
      <Text style={styles.title}>{subjectTitle}</Text>
      <FlatList
        data={documents}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.cardList}
      />
      <TouchableOpacity style={styles.floatingButton}>
        <Text style={styles.floatingButtonText}>+</Text>
      </TouchableOpacity>
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
    fontSize: 20,
    fontWeight: "bold",
    color: "#013868",
    textAlign: "center",
    marginVertical: 15,
  },
  cardList: {
    marginTop: -10,
    padding: 20,
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 13,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  iconContainer: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EDEDED",
    borderRadius: 90,
  },
  itemText: {
    flex: 1, // Omogućava tekstu da zauzme preostali prostor između ikonica
    marginLeft: 20,
    fontSize: 16,
    fontWeight: "bold",
    color: "#013868",
  },
  downloadButton: {
    padding: 10, // Daje prostor oko ikonice za lakše klikanje
  },
  floatingButton: {
    position: "absolute",
    right: 30,
    bottom: 60,
    width: 60,
    height: 60,
    backgroundColor: "#013868",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
  floatingButtonText: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    lineHeight: 33,
  },
});

export default MaterialsSubjectItemsScreen;

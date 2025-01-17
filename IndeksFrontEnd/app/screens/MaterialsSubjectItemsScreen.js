import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Sidebar from "../components/SidebarComponent";
import Icon from "react-native-vector-icons/FontAwesome";
import HeaderComponent from "../components/HeaderComponent";

// Sample document data
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
  const { subjectTitle } = route.params; // Getting subject title from params
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handleDownload = (documentTitle) => {
    console.log(`Downloading: ${documentTitle}`);
    // You can add the file download functionality here
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleDownload(item.title)}
    >
      <View style={styles.iconContainer}>
        <Icon name={item.icon} size={22} color="#013868" />
      </View>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <TouchableOpacity style={styles.downloadButton}>
        <Icon name="download" size={20} color="#013868" />
      </TouchableOpacity>
    </TouchableOpacity>
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
    fontSize: 22,
    fontWeight: "bold",
    color: "#013868",
    textAlign: "center",
    marginVertical: 15,
  },
  cardList: {
    marginTop: -10,
    paddingHorizontal: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginVertical: 5,
    borderRadius: 8,
    padding: 15,
    elevation: 2,
  },
  iconContainer: {
    marginRight: 15,
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8EAF6",
    borderRadius: 20,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#013868",
    flex: 1,
  },
  downloadButton: {
    padding: 10,
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

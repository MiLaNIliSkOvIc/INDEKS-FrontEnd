import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import Sidebar from "../components/SidebarComponent";
import Icon from "react-native-vector-icons/FontAwesome";
import HeaderComponent from "../components/HeaderComponent";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { useUser } from "../hooks/useUser";
import HttpService from "../services/HttpService";

const documents = [
  { id: "1", icon: "file-text", title: "Priručnik za vežbe" },
  { id: "2", icon: "file-text", title: "Skripta za predavanja" },
  { id: "3", icon: "file-text", title: "Zbirka zadataka" },
  { id: "4", icon: "file-text", title: "Prezentacije" },
];

const MaterialsSubjectItemsScreen = ({ route, navigation }) => {
  const { subjectTitle } = route.params;
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  var user = useUser()
  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handlePlusClick = async () => {
    try {
    
      const result = await DocumentPicker.getDocumentAsync({ type: "*/*" });
  
      if (result.canceled) {
        console.log("File selection canceled");
        return;
      }
  
      const file = result.assets[0];
      const fileUri = file.uri;
  
  
      const base64 = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      
   
      const payload = {
        base64: base64,
        name: file.name,
        subjectId: 10, 
        ownerAccountId: user.accountId, 
      };
  
      
      const response = await HttpService.create("material/upload", payload);
      console.log(response)
      if (response.error) {
        console.error("Failed to upload file:", response.message);
      } else {
        console.log("File uploaded successfully:", response);
      }
    } catch (error) {
      console.error("Error handling file upload:", error);
    }
  };

  const handleDownload = (documentTitle) => {
    console.log(`Downloading: ${documentTitle}`);
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
      <TouchableOpacity style={styles.floatingButton} onPress={handlePlusClick}>
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

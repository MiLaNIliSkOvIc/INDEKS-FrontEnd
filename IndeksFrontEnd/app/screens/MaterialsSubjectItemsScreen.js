import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import Sidebar from "../components/SidebarComponent";
import Icon from "react-native-vector-icons/FontAwesome";
import HeaderComponent from "../components/HeaderComponent";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { useUser } from "../hooks/useUser";
import HttpService from "../services/HttpService";
import * as MediaLibrary from 'expo-media-library';
import { Alert } from 'react-native';
import * as Permissions from 'expo-permissions';

const MaterialsSubjectItemsScreen = ({ route, navigation }) => {
  const { id, subjectTitle } = route.params; // Preuzimanje subjectId iz route.params
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useUser();

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const fetchMaterials = async () => {
    try {
      setLoading(true);
      console.log(id)
      console.log(subjectTitle)
      const response = await HttpService.get(
        `material/materials/subject/${id}`
      );
      console.log(response)
      if (response.error) {
        console.error("Failed to fetch materials:", response.message);
      } else {
        setMaterials(response);
      }
    } catch (error) {
      console.error("Error fetching materials:", error);
    } finally {
      setLoading(false);
    }
  };



const handleDownload = async (material) => {
  try {
    console.log("Material info:", material);

    // Fetch material data
    const response = await HttpService.get(`material/material/${material.id}`);
    if (response.error) {
      console.error("Failed to fetch material:", response.message);
      Alert.alert("Download Failed", response.message || "Unknown error occurred");
      return;
    }

    const base64 = response.base64Content;
    const tempUri = FileSystem.documentDirectory + material.name;

    // Save file temporarily
    await FileSystem.writeAsStringAsync(tempUri, base64, {
      encoding: FileSystem.EncodingType.Base64,
    });

    const fileInfo = await FileSystem.getInfoAsync(tempUri);
    console.log("Temporary file info:", fileInfo);

    if (!fileInfo.exists) {
      console.error("File does not exist at temporary URI:", tempUri);
      Alert.alert("Error", "Temporary file could not be created.");
      return;
    }

    // Request Media Library permissions
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert("Permission Denied", "Cannot save file to Media Library.");
      return;
    }

    // Define the destination path in the Downloads directory (for Android)
    const destinationUri = FileSystem.documentDirectory + "Downloads/" + material.name;

    // Try copying the file to the public directory (Android)
    await FileSystem.copyAsync({ from: tempUri, to: destinationUri });

    // Check if the file was successfully copied
    const copiedFileInfo = await FileSystem.getInfoAsync(destinationUri);
    if (!copiedFileInfo.exists) {
      throw new Error("Failed to copy file to Downloads directory.");
    }

    // Create asset from copied file in public directory
    const asset = await MediaLibrary.createAssetAsync(destinationUri);
    if (!asset) {
      throw new Error("Failed to create asset.");
    }

    // Get or create the album
    let album = await MediaLibrary.getAlbumAsync("Download");

    if (!album) {
      console.log("Album 'Download' does not exist. Creating...");
      album = await MediaLibrary.createAlbumAsync("Download", asset, false);
    } else {
      console.log("Adding asset to existing album...");
      await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
    }

    Alert.alert("Download Complete", `${material.name} saved to Media Library.`);
  } catch (error) {
    console.error("Error during file handling:", error);
    Alert.alert("Error", error.message || "An unexpected error occurred.");
  }
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
        subjectId: subjectId,
        ownerAccountId: user.accountId,
      };

      const response = await HttpService.create("material/upload", payload);
      if (response.error) {
        console.error("Failed to upload file:", response.message);
      } else {
        console.log("File uploaded successfully:", response);
        fetchMaterials(); 
      }
    } catch (error) {
      console.error("Error handling file upload:", error);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}  
    >
      <View style={styles.iconContainer}>
        <Icon name="file-text" size={22} color="#013868" />
      </View>
      <Text style={styles.itemTitle}>{item.name}</Text>
      <TouchableOpacity style={styles.downloadButton} onPress={ () => handleDownload(item)}>
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
      {loading ? (
        <ActivityIndicator size="large" color="#013868" />
      ) : (
        <FlatList
          data={materials}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.cardList}
        />
      )}
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

import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Sidebar from "../app/components/SidebarComponent";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import HeaderComponent from "../app/components/HeaderComponent";
const data = [
  { id: "1", year: "I", title: "Prva godina" },
  { id: "2", year: "II", title: "Druga godina" },
  { id: "3", year: "III", title: "Treća godina" },
  { id: "4", year: "IV", title: "Četvrta godina" },
];

const MaterialsScreen = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };
  const navigation = useNavigation();

  const handleItemPress = (id) => {
    navigation.navigate("GodinaScreen", {
      title: data.find((item) => item.id === id).title,
    });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleItemPress(item.id)}
    >
      <View style={styles.iconContainer}>
        <View style={styles.numberCircle}>
          <Text style={styles.numberText}>{item.year}</Text>
        </View>
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <HeaderComponent toggleSidebar={toggleSidebar} />
      <Text style={styles.title}>Materijali</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    marginVertical: 5,
    marginHorizontal: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    marginRight: 15,
  },
  numberCircle: {
    backgroundColor: "#E8EAF6",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  numberText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#013868",
  },
  detailsContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#013868",
  },
  floatingButton: {
    position: "absolute",
    right: 20,
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
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default MaterialsScreen;

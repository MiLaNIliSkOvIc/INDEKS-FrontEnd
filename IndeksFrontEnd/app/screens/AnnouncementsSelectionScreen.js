import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, Switch } from "react-native";
import Sidebar from "../components/SidebarComponent";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon5 from "react-native-vector-icons/FontAwesome5";
import Icon6 from "react-native-vector-icons/FontAwesome6";
import HeaderComponent from "../components/HeaderComponent";

const data = [
  { id: "1", icon: "list-alt", title: "Prva godina", family: "FontAwesome" },
  { id: "2", icon: "list-alt", title: "Druga godina", family: "FontAwesome" },
  { id: "3", icon: "list-alt", title: "Treća godina", family: "FontAwesome" },
  { id: "4", icon: "list-alt", title: "Četvrta godina", family: "FontAwesome" },
];

const AnnouncementsSelectionScreen = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  // Stanje za praćenje stanja Switch komponenata
  const [selectedItems, setSelectedItems] = useState({});

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  // Funkcija za promenu stanja Switch-a
  const toggleSwitch = (id) => {
    setSelectedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderIcon = (family, iconName) => {
    switch (family) {
      case "FontAwesome":
        return <Icon name={iconName} size={24} color="#013868" />;
      case "FontAwesome5":
        return <Icon5 name={iconName} size={24} color="#013868" />;
      case "Feather":
        return <Icon6 name={iconName} size={24} color="#013868" />;
      default:
        return <Icon name="question-circle" size={24} color="red" />;
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.iconContainer}>
        {renderIcon(item.family, item.icon)}
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
      </View>

      <Switch
        value={selectedItems[item.id] || false}
        onValueChange={() => toggleSwitch(item.id)}
        trackColor={{ false: "#767577", true: "#013868" }}
        thumbColor={selectedItems[item.id] ? "#68b7fd" : "#f4f3f4"}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <HeaderComponent toggleSidebar={toggleSidebar} />
      <Text style={styles.headerTitle}>Odabir oglasa</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedItems} // Osvježava listu pri promeni Switch stanja
      />
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
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 7,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    marginVertical: 5,
    marginHorizontal: 15,
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
  detailsContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#013868",
  },
});

export default AnnouncementsSelectionScreen;

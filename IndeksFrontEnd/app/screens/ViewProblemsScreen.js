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
import { useNavigation } from "@react-navigation/native";

const data = [
  {
    id: "1",
    icon: "comments",
    title: "Prijavljeni komentari",
    count: 3,
    screen: "ReportedCommentsScreen",
  },
  {
    id: "2",
    icon: "folder",
    title: "Prijavljeni materijali",
    count: 1,
    screen: "ReportedMaterialsScreen",
  },
  {
    id: "3",
    icon: "user",
    title: "Prijavljeni nalozi",
    count: 1,
    screen: "ReportedUsersScreen",
  },
];

const ProblemsScreen = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const navigation = useNavigation();

  const handleItemPress = (screen) => {
    navigation.navigate(screen);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => handleItemPress(item.screen)}
    >
      <View style={styles.iconContainer}>
        <Icon name={item.icon} size={24} color="#013868" />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
      </View>
      <View style={styles.countContainer}>
        <Text style={styles.countText}>{item.count}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <HeaderComponent toggleSidebar={toggleSidebar} />
      <Text style={styles.headerTitle}>Prijavljeni problemi</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
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
    paddingVertical: 15,
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
    color: "#013868",
  },
  countContainer: {
    backgroundColor: "#013868",
    borderRadius: 15,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  countText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default ProblemsScreen;

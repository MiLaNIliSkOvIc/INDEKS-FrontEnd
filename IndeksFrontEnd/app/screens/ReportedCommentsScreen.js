import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Sidebar from "../components/SidebarComponent";
import HeaderComponent from "../components/HeaderComponent";
import { useNavigation } from "@react-navigation/native";

const data = [
  {
    id: "1",
    icon: "comments",
    title: "Prijavljen komentar #1",
    text: "Tekst prijavljenog komentara #1",
    date: "13:40",
  },
  {
    id: "2",
    icon: "comments",
    title: "Prijavljen komentar #2",
    text: "Tekst prijavljenog komentara #2",
    date: "Juče",
  },
  {
    id: "3",
    icon: "comments",
    title: "Prijavljen komentar #3",
    text: "Tekst prijavljenog komentara #3",
    date: "28. 3. 2024.",
  },
];

const ReportedCommentsScreen = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const navigation = useNavigation();

  const handleItemPress = (screen) => {
    navigation.navigate(screen);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <View style={styles.iconContainer}>
        <Icon name={item.icon} size={24} color="#013868" />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemText}>{item.text}</Text>
        <Text style={styles.itemDate}>{item.date}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <HeaderComponent toggleSidebar={toggleSidebar} />
      <Text style={styles.headerTitle}>Prijavljeni komentari</Text>
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
  detailsContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 18,
    color: "#013868",
    marginLeft: 10,
  },
  itemText: {
    fontSize: 12,
    color: "#013868",
    marginLeft: 10,
    marginTop: 10,
  },
  itemDate: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
    textAlign: "right",
  },
});

export default ReportedCommentsScreen;

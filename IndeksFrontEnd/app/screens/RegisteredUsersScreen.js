import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Sidebar from "../components/SidebarComponent";
import IconFeather from "react-native-vector-icons/Feather";
import HeaderComponent from "../components/HeaderComponent";

const data = [
  { id: "1", name: "Dejan Janjić", registrationDate: "8. 10. 2021." },
  { id: "2", name: "Marko Grabas", registrationDate: "27. 11. 2021." },
  { id: "3", name: "Milan Ilišković", registrationDate: "11. 10. 2021." },
  { id: "4", name: "Igor Piljagić", registrationDate: "16. 10. 2021." },
  { id: "5", name: "Tijana Lazendić", registrationDate: "23. 10. 2021." },
  { id: "6", name: "Mihajlo Ševa", registrationDate: "3. 11. 2021." },
  { id: "7", name: "Registrovani korisnik", registrationDate: "13. 10. 2021." },
  { id: "8", name: "Registrovani korisnik", registrationDate: "13. 10. 2021." },
  { id: "9", name: "Registrovani korisnik", registrationDate: "13. 10. 2021." },
  {
    id: "10",
    name: "Registrovani korisnik",
    registrationDate: "13. 10. 2021.",
  },
  {
    id: "11",
    name: "Registrovani korisnik",
    registrationDate: "11. 10. 2021.",
  },
  {
    id: "12",
    name: "Registrovani korisnik",
    registrationDate: "13. 11. 2021.",
  },
  {
    id: "13",
    name: "Registrovani korisnik",
    registrationDate: "13. 10. 2021.",
  },
  {
    id: "14",
    name: "Registrovani korisnik",
    registrationDate: "11. 10. 2021.",
  },
  {
    id: "15",
    name: "Registrovani korisnik",
    registrationDate: "13. 11. 2021.",
  },
  {
    id: "16",
    name: "Registrovani korisnik",
    registrationDate: "13. 10. 2021.",
  },
  {
    id: "17",
    name: "Registrovani korisnik",
    registrationDate: "11. 10. 2021.",
  },
  {
    id: "18",
    name: "Registrovani korisnik",
    registrationDate: "13. 11. 2021.",
  },
];

const RegistredUsersScreen = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.iconContainer}>
        <IconFeather name="user" size={40} color="#a6a6a6" />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.dateText}>Registrovan {item.registrationDate}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <HeaderComponent toggleSidebar={toggleSidebar} />
      <Text style={styles.headerTitle}>Registrovani korisnici</Text>
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

export default RegistredUsersScreen;

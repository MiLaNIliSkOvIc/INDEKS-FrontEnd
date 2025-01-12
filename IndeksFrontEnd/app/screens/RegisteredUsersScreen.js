import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Sidebar from "../components/SidebarComponent";
import IconFeather from "react-native-vector-icons/Feather";
import HeaderComponent from "../components/HeaderComponent";

const data = [
  {
    id: "1",
    name: "Dejan Janjić",
    email: "dejan.janjic@student.etfbl.org",
    status: "Aktivan",
  },
  {
    id: "2",
    name: "Marko Grabas",
    email: "marko.grabas@student.etfbl.org",
    status: "Suspendovan",
  },
  {
    id: "3",
    name: "Milan Ilišković",
    email: "milan.iliskovic@student.etfbl.org",
    status: "Aktivan",
  },
  {
    id: "4",
    name: "Igor Piljagić",
    email: "igor.piljagic@student.etfbl.org",
    status: "Suspendovan",
  },
  // Dodaj i ostale korisnike
];

const RegistredUsersScreen = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handleStatusChange = (item) => {
    // Ovaj metod bi trebalo da menja status korisnika kada dugme bude pritisnuto
    if (item.status === "Aktivan") {
      item.status = "Suspendovan";
    } else {
      item.status = "Aktivan";
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.iconContainer}>
        <IconFeather name="user" size={27} color="#a6a6a6" />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.emailText}>{item.email}</Text>
      </View>
      <View style={styles.statusContainer}>
        <Text style={styles.statusText}>{item.status}</Text>
        <TouchableOpacity
          style={[
            styles.actionButton,
            {
              backgroundColor:
                item.status === "Aktivan" ? "#FF6F61" : "#81C784",
            },
          ]}
          onPress={() => handleStatusChange(item)}
        >
          <Text style={styles.actionText}>
            {item.status === "Aktivan" ? "Suspenduj" : "Reaktiviraj"}
          </Text>
        </TouchableOpacity>
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
    marginRight: 10,
    marginLeft: -8,
  },
  detailsContainer: {
    flex: 1,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#013868",
  },
  emailText: {
    fontSize: 11,
    color: "#a6a6a6",
  },
  statusContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  statusText: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  actionButton: {
    paddingHorizontal: 8,
    paddingVertical: 8,
    borderRadius: 5,
  },
  actionText: {
    textAlign: "center",
    fontSize: 10,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default RegistredUsersScreen;

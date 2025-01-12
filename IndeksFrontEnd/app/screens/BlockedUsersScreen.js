import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import IconFeather from "react-native-vector-icons/Feather";
import HeaderComponent from "../components/HeaderComponent";
import Sidebar from "../components/SidebarComponent";

const data = [
  { id: "1", name: "Dejan Janjić", blockedSince: "8. 10. 2021." },
  { id: "2", name: "Marko Grabas", blockedSince: "27. 11. 2021." },
  { id: "3", name: "Milan Ilišković", blockedSince: "11. 10. 2021." },
  { id: "4", name: "Igor Piljagić", blockedSince: "16. 10. 2021." },
];

const BlockedUsersScreen = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };
  const handleUnblock = (userName) => {
    console.log(`Odblokiraj: ${userName}`);
  };
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.iconContainer}>
        <IconFeather name="user" size={40} color="#a6a6a6" />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.nameText}>{item.name}</Text>
        <Text style={styles.dateText}>Blokiran {item.blockedSince}</Text>
      </View>
      <TouchableOpacity
        style={styles.unblockButton}
        onPress={() => handleUnblock(item.name)}
      >
        <Text style={styles.unblockButtonText}>Odblokiraj</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <HeaderComponent toggleSidebar={toggleSidebar} />
      <Text style={styles.headerTitle}>Blokirani korisnici</Text>
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
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#013868",
  },
  unblockButton: {
    backgroundColor: "#013868",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  unblockButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default BlockedUsersScreen;

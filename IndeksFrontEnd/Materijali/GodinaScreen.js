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

const data = [
  { id: "1", icon: "calculator", title: "Matematika 1" },
  { id: "2", icon: "flask", title: "Fizika" },
  { id: "3", icon: "bolt", title: "ElektroTehnika" },
  { id: "4", icon: "desktop", title: "Osnovi racunarske tehnike" },
];

const GodinaScreen = ({ route, navigation }) => {
  const { title } = route.params;
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const renderItem = ({ item }) => (
    <View style={styles.cardContainer}>
      <View style={styles.iconContainer}>
        <Icon name={item.icon} size={22} color="#013868" />
      </View>
      <Text style={styles.itemText}>{item.title}</Text>
    </View>
  );

  const Header = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Icon name="arrow-left" size={20} color="#fff" />
      </TouchableOpacity>
      <Image
        source={require("../app/assets/logo.png")}
        style={styles.headerLogo}
        resizeMode="contain"
      />
      <Text style={styles.headerText}>Indeks</Text>
      <TouchableOpacity>
        <Image
          source={require("../app/assets/search.png")}
          style={styles.headerIcon}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={data}
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#013868",
    paddingTop: 37,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#C7C7C7",
  },
  headerIcon: {
    width: 50,
    height: 40,
  },
  headerLogo: {
    width: 100,
    height: 40,
    marginRight: 30,
  },
  headerText: {
    marginRight: 30,
    marginLeft: -100,
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#013868",
    textAlign: "center",
    marginVertical: 15,
  },
  cardList: {
    marginTop: -10,
    padding: 20,
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 13,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  iconContainer: {
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#EDEDED",
    borderRadius: 90,
  },
  itemText: {
    marginLeft: 20,
    fontSize: 16,
    fontWeight: "bold",
    color: "#013868",
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

export default GodinaScreen;

import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const HeaderComponent = ({ toggleSidebar }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={toggleSidebar}>
        <Icon name="bars" size={28} color="#fff" />
      </TouchableOpacity>
      <Image
        source={require("../assets/logo.png")}
        style={styles.headerLogo}
        resizeMode="contain"
      />
      <Text style={styles.headerText}>Indeks</Text>
      <TouchableOpacity>
        <Image source={require("../assets/search.png")} style={styles.icon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#013868",
    paddingTop: 35,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  headerLogo: {
    width: 100,
    height: 40,
    marginRight: 20,
  },
  headerText: {
    marginRight: 30,
    marginLeft: -100,
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  icon: {
    width: 40,
    height: 40,
  },
});

export default HeaderComponent;

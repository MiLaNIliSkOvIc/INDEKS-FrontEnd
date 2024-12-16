import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Sidebar from "../components/SidebarComponent";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon5 from "react-native-vector-icons/FontAwesome5";
import Icon6 from "react-native-vector-icons/FontAwesome6";
import IconFeather from "react-native-vector-icons/Feather";
import HeaderComponent from "../components/HeaderComponent";
import { useNavigation } from "@react-navigation/native";

const ChangePasswordScreen = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();
  const handleItemPress = (screen) => {
    navigation.navigate(screen);
  };

  const back = () => {
    console.log(navigate);
    navigation.navigate(navigate);
  };

  const handleConfirm = () => {
    console.log("Stara lozinka:", oldPassword);
    console.log("Nova lozinka:", newPassword);
    console.log("Potvrđena lozinka:", confirmPassword);
  };

  // const renderItem = ({ item }) => (
  //   <TouchableOpacity
  //     style={styles.itemContainer}
  //     onPress={() => handleItemPress(item.screen)}
  //   >
  //     <View style={styles.iconContainer}>
  //       {renderIcon(item.family, item.icon)}
  //     </View>
  //     <View style={styles.detailsContainer}>
  //       <Text style={styles.itemTitle}>{item.title}</Text>
  //     </View>
  //   </TouchableOpacity>
  // );

  return (
    <View style={styles.container}>
      <HeaderComponent toggleSidebar={toggleSidebar} />
      <View style={styles.inputContainer}>
        <Text style={styles.headerTitle}>Promjena lozinke</Text>
        <TextInput
          style={styles.input}
          placeholder="Unesite staru lozinku"
          secureTextEntry={true}
          value={oldPassword}
          onChangeText={(text) => setOldPassword(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Unesite novu lozinku"
          secureTextEntry={true}
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Potvrdite novu lozinku"
          secureTextEntry={true}
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Potvrdi</Text>
      </TouchableOpacity>
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
  inputContainer: {
    //marginTop: 30,
    paddingHorizontal: 20,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    fontSize: 16,
    color: "#013868",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  button: {
    backgroundColor: "#013868",
    borderRadius: 8,
    marginHorizontal: 100,
    marginTop: 20,
    paddingVertical: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ChangePasswordScreen;

import React from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import Sidebar from "../components/SidebarComponent";

const chats = [
  {
    id: "1",
    name: "Marko Marković",
    lastMessage: "Trebalo bi da je u utorak u 13:00h",
  },
  { id: "2", name: "Ivan Ivanović", lastMessage: "Poruka 2" },
  { id: "3", name: "Milan Milanović", lastMessage: "Poruka 3" },
  { id: "4", name: "Stefan Stefanović", lastMessage: "Poruka 4" },
  { id: "5", name: "Registrovani Korisnik", lastMessage: "Poruka 5" },
  { id: "6", name: "Registrovani Korisnik", lastMessage: "Poruka 6" },
  { id: "7", name: "ISZ", lastMessage: "You: Kad je sastanak?" },
  {
    id: "8",
    name: "Treća godina - Računarstvo i informatika",
    lastMessage: "Marko: Koja je šifra za projektovanje softvera?",
  },
  {
    id: "9",
    name: "Registrovani Korisnik",
    lastMessage: "You: Trebalo bi da je u srijedu u 13:00h",
  },
  { id: "10", name: "ISZ", lastMessage: "You: Kad je sastanak?" },
  {
    id: "11",
    name: "Treća godina - Računarstvo i informatika",
    lastMessage: "Marko: Koja je šifra za projektovanje softvera?",
  },
  {
    id: "12",
    name: "Registrovani Korisnik",
    lastMessage: "You: Trebalo bi da je u srijedu u 13:00h",
  },
];
const ChatListScreen = () => {
  const navigation = useNavigation();

  const handleChatPress = (chat) => {
    navigation.navigate("Chat");
  };

  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handlePlusPress = () => {
    navigation.navigate("NewPrivateGroupScreen");
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.chatItem}
      onPress={() => handleChatPress(item)}
    >
      <View style={styles.chatAvatar}>
        <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
      </View>
      <View style={styles.chatDetails}>
        <Text style={styles.chatName}>{item.name}</Text>
        <Text style={styles.chatLastMessage}>{item.lastMessage}</Text>
      </View>
    </TouchableOpacity>
  );

  const Header = () => (
    <View style={styles.header}>
      <TouchableOpacity onPress={toggleSidebar}>
        <Icon name="bars" size={30} color="#888" style={styles.headerIcon} />
      </TouchableOpacity>
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.headerLogo}
        resizeMode="contain"
      />
      <Text style={styles.headerText}>Indeks</Text>

      <TouchableOpacity onPress={() => navigation.navigate("SearchScreen")}>
        <Image
          source={require("../assets/images/search.png")}
          style={styles.headerIcon}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <FlatList
        data={chats}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity style={styles.floatingButton} onPress={handlePlusPress}>
        <Image
          source={require("../assets/images/plus.png")}
          style={styles.floatingButtonImage}
        />
      </TouchableOpacity>
      <Sidebar visible={isSidebarVisible} onClose={toggleSidebar} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C7C7C7",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#C7C7C7",
    paddingTop: 40,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#aaa",
  },
  headerLogo: {
    width: 40,
    height: 40,
    marginRight: -75,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#013868",
  },
  headerIcon: {
    width: 50,
    height: 40,
    paddingTop: 8,
    right: -7,
  },
  chatItem: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#aaa",
  },
  chatAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#013868",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  chatDetails: {
    marginLeft: 15,
    justifyContent: "center",
  },
  chatName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  chatLastMessage: {
    fontSize: 14,
    color: "#888",
  },
  floatingButton: {
    position: "absolute",
    right: 20,
    bottom: 40,
    width: 60,
    height: 60,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 8,
  },
  floatingButtonImage: {
    width: 70,
    height: 70,
  },
});

export default ChatListScreen;

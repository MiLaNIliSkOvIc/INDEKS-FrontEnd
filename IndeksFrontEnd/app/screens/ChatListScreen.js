import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import Sidebar from "../components/SidebarComponent";
import HttpService from "../services/HttpService";
import { useUser } from "../hooks/useUser"

const ChatListScreen = () => {
  const navigation = useNavigation();
  const [chats, setChats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const user = useUser();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        //TODO uzeti userid iz tokena
       
        const response = await HttpService.get(`singleChat/user/${user.accountId}/summary`);
        
        
        const mappedChats = response.map((chat) => ({
          id: chat.id.toString(), 
          name: chat.name,
          sender: chat.sender,
          lastMessage: chat.lastMessage,
        }));

        setChats(mappedChats); 
      } catch (error) {
        console.error("Error fetching chats:", error.message);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchChats();
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  const handleChatPress = (chat) => {
    console.log(chat)
    navigation.navigate("Chat", { chatId: chat.id,userId:user.accountIdx,name: chat.name });
  };

  const handlePlusPress = () => {
    console.log("Plus button pressed!");
    navigation.navigate("NewPrivateGroupScreen")
  };
  const handleSearchPress = () => {
    console.log("Plus button pressed!");
    navigation.navigate("SearchScreen")
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
      <TouchableOpacity onPress={handleSearchPress}>
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
      {isLoading ? (
        <ActivityIndicator size="large" color="#013868" />
      ) : (
        <FlatList
          data={chats}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
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

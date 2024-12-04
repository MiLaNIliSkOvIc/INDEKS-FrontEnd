import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import HttpService from "../services/HttpService";

const ChatScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { chatId, userId,name } = route.params;
  var br=0
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messageText, setMessageText] = useState("");

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await HttpService.get(
          `singleChat/${chatId}/messages?userId=${userId}`
        );

        
        const sortedMessages = response.sort((a, b) => new Date(b.time) - new Date(a.time));

        setMessages(sortedMessages);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [chatId, userId]);

  const addMessage = (newMessage) => {
    const updatedMessages = [newMessage,...messages];  
    setMessages(updatedMessages);
  };
  const generateUniqueId = () => {
    let newId;
    let exists = true;
    
   
    while (exists) {
      newId = Math.random().toString(36).substr(2, 9); 
      exists = messages.some(message => message.id === newId); 
    }
  
    return newId;
  };

  const sendMessage = async () => {
    if (messageText.trim() === "") return;
    setMessageText(""); 
    const newMessage = {
      text: messageText,
      time: new Date().toISOString(),
      singleChatId: chatId,
      groupChatId: 0, 
      status: "SENT",
      userAccountId: userId,
    };
   
    const mess={
      id: generateUniqueId(),
      text: messageText,
      time: newMessage.time,
      sentByUser: true
    }
      addMessage(mess)
    try {
      await HttpService.create("message", newMessage);

      
      const response = await HttpService.get(
        `singleChat/${chatId}/messages?userId=${userId}`
      );

     
      const sortedMessages = response.sort((a, b) => new Date(b.time) - new Date(a.time));

      setMessages(sortedMessages);
      
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageWrapper,
        item.sentByUser ? styles.userMessageWrapper : styles.otherMessageWrapper,
      ]}
    >
      {!item.sentByUser && item.profileImage && (
        <Image source={{ uri: item.profileImage }} style={styles.profileImage} />
      )}
      <View
        style={[
          styles.messageContainer,
          item.sentByUser
            ? styles.userMessageContainer
            : styles.otherMessageContainer,
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
        <View style={styles.timeContainer}>
          <Text style={styles.messageTime}>{item.time}</Text>
          {item.sentByUser && (
            <Ionicons name="checkmark-done-outline" size={14} color="#999" />
          )}
        </View>
      </View>
    </View>
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("ChatList")}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{name}</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#007aff" style={styles.loader} />
      ) : (
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          inverted 
          contentContainerStyle={styles.chatContainer}
        />
      )}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Poruka..."
          value={messageText}
          onChangeText={setMessageText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Ionicons name="send-outline" size={24} color="#007aff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0e0e0",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 50,
    padding: 10,
    backgroundColor: "#f8f8f8",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  chatContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  messageWrapper: {
    flexDirection: "row",
    marginVertical: 5,
  },
  userMessageWrapper: {
    justifyContent: "flex-end",
  },
  otherMessageWrapper: {
    justifyContent: "flex-start",
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
    alignSelf: "flex-end",
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    maxWidth: "75%",
  },
  userMessageContainer: {
    backgroundColor: "#DCF8C6",
    alignSelf: "flex-end",
  },
  otherMessageContainer: {
    backgroundColor: "#ffffff",
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
    color: "#000",
  },
  timeContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 5,
  },
  messageTime: {
    fontSize: 12,
    color: "#999",
    marginRight: 5,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    backgroundColor: "#f8f8f8",
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  sendButton: {
    marginLeft: 10,
  },
});

export default ChatScreen;

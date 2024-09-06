import React from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  
import { useNavigation } from '@react-navigation/native';

const ChatComponent = () => {
    const navigation = useNavigation();
    const handleChatPress = () => {
        console.log("Milan")
        navigation.navigate('ChatList'); 
      };
  const messages = [
  
    {
      id: '1',
      text: 'Trebalo bi da je u utorak u 13:00h',
      time: '12:37',
      isSentByUser: true,
    },
    {
        id: '2',
        text: 'Zna li se kad je termin odbrane SRS-a?',
        time: '12:07',
        isSentByUser: false,
        profileImage: 'images.png', 
      },
  ];

  const renderItem = ({ item }) => (
    <View style={[styles.messageWrapper, item.isSentByUser ? styles.userMessageWrapper : styles.otherMessageWrapper]}>
      {!item.isSentByUser && (
        <Image
          //source={{ uri: item.profileImage }}
          source={require('../pictures/images.png')} 
          style={styles.profileImage}
        />
      )}
      <View
        style={[
          styles.messageContainer,
          item.isSentByUser ? styles.userMessageContainer : styles.otherMessageContainer,
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
        <View style={styles.timeContainer}>
          <Text style={styles.messageTime}>{item.time}</Text>
          {item.isSentByUser && <Ionicons name="checkmark-done-outline" size={14} color="#999" />}
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleChatPress}>
          <Ionicons name="arrow-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Registrovani Korisnik</Text>
        <TouchableOpacity>
          <Ionicons name="ellipsis-vertical-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        inverted
        contentContainerStyle={styles.chatContainer}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Poruka..."
        />
        <TouchableOpacity style={styles.sendButton}>
          <Ionicons name="send-outline" size={24} color="#007aff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop  : 50,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  chatContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  messageWrapper: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  userMessageWrapper: {
    justifyContent: 'flex-end',
  },
  otherMessageWrapper: {
    justifyContent: 'flex-start',
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
    alignSelf: 'flex-end',
  },
  messageContainer: {
    padding: 10,
    borderRadius: 10,
    maxWidth: '75%',
  },
  userMessageContainer: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  otherMessageContainer: {
    backgroundColor: '#ffffff',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
    color: '#000',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 5,
  },
  messageTime: {
    fontSize: 12,
    color: '#999',
    marginRight: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center', 
    padding: 10,
    paddingBottom:30,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#f8f8f8',
  },
  input: {
    flex: 1,
    height: 40,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  sendButton: {
    marginLeft: 10,
  },
});

export default ChatComponent;

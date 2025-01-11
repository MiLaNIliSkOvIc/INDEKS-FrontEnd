import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import HttpService from "../services/HttpService"; 
const NewPrivateGroupScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");
  const [addedUsers, setAddedUsers] = useState([]); 
  const [allUsers, setAllUsers] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await HttpService.get("userAccount");
        setAllUsers(users.map((user) => ({ id: user.account.id, email: user.account.email })));
        setLoading(false);
      } catch (err) {
        setError("Greška prilikom učitavanja korisnika.");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
  

  const filteredUsers = allUsers.filter(
    (user) =>
      user.email.toLowerCase().includes(searchText.toLowerCase()) &&
      !addedUsers.some((added) => added.id === user.id)
  );

  const addUser = (user) => {
    setAddedUsers([...addedUsers, user]);
    setSearchText("");
  };

  const removeUser = (user) => {
    setAddedUsers(addedUsers.filter((u) => u.id !== user.id));
  };

  const createGroup = () => {
    if (addedUsers.length > 0) {
      console.log("Grupa kreirana sa korisnicima:", addedUsers);
      navigation.navigate("Chat", { otherUserId: addedUsers[0].id });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.keyboardAvoidingView}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-left" size={24} color="#013868" />
          </TouchableOpacity>
          <Text style={styles.title}>Nova grupa</Text>
        </View>

        <View style={styles.searchContainer}>
          <Icon name="search" size={20} color="#aaa" />
          <TextInput
            style={styles.input}
            placeholder="Pronađite korisnike koje ćete dodati"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#007AFF" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : filteredUsers.length > 0 ? (
          <FlatList
            data={filteredUsers}
            keyExtractor={(item) => item.id.toString()} 
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.userItem}
                onPress={() => addUser(item)}
              >
                <Text style={styles.userText}>{item.email}</Text> 
              </TouchableOpacity>
            )}
            style={styles.userList}
          />
        ) : (
          <Text style={styles.noResultsText}>Nema rezultata za pretragu.</Text>
        )}

        <View style={styles.addedUsersContainer}>
          {addedUsers.map((user) => (
            <View style={styles.addedUserItem} key={user.id}>
              <Text style={styles.addedUserText}>{user.email}</Text>
              <TouchableOpacity onPress={() => removeUser(user)}>
                <Icon name="times" size={20} color="#f00" />
              </TouchableOpacity>
            </View>
          ))}
        </View>

        {addedUsers.length > 0 && (
          <TouchableOpacity style={styles.createButton} onPress={createGroup}>
            <Icon name="check" size={24} color="#fff" />
          </TouchableOpacity>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C7C7C7",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#C7C7C7",
    paddingTop: 40,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#aaa",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    paddingHorizontal: 10,
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  input: {
    flex: 1,
    height: 40,
    marginLeft: 10,
  },
  userList: {
    maxHeight: 150,
    marginHorizontal: 10,
  },
  userItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  userText: {
    fontSize: 16,
  },
  addedUsersContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    margin: 10,
  },
  addedUserItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e7f3ff",
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  addedUserText: {
    marginRight: 10,
  },
  createButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007AFF",
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
  noResultsText: {
    textAlign: "center",
    marginVertical: 10,
    color: "#555",
  },
});

export default NewPrivateGroupScreen;

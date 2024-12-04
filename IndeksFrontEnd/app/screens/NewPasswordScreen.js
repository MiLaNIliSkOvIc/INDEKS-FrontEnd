import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import IndeksBackground from "../components/IndeksBackground";
import LogoWithTitleComponent from "../components/LogoWithTitleComponent";
import IndeksTextInput from "../components/IndeksTextInput";
import BigBasicButtonComponent from "../components/BigBasicButtonComponent";
import colors from "../config/colors";
import fonts from "../config/fonts";

const NewPasswordScreen = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigation = useNavigation();

  const handleSavePress = () => {
    // Dodajte logiku za čuvanje nove lozinke
    console.log("Nova lozinka sačuvana:", newPassword, confirmPassword);
  };

  const handleBackToLoginPress = () => {
    navigation.navigate("Login");
  };

  return (
    <IndeksBackground>
      <LogoWithTitleComponent style={styles.logoContainer} />
      <View style={styles.container}>
        <Text style={styles.title}>Oporavak lozinke</Text>
        <View style={styles.inputs}>
          <IndeksTextInput
            placeholder="Nova lozinka"
            secureTextEntry={true}
            value={newPassword}
            onChangeText={setNewPassword}
            style={styles.input}
          />
          <IndeksTextInput
            placeholder="Ponovite novu lozinku"
            secureTextEntry={true}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.input}
          />
        </View>
        <BigBasicButtonComponent
          style={styles.saveButton}
          onPress={handleSavePress}
        >
          SAČUVAJ
        </BigBasicButtonComponent>
        <View style={styles.mainLink}>
          <TouchableOpacity onPress={handleBackToLoginPress}>
            <Text style={styles.backToLoginText}>Vrati se na prijavu</Text>
          </TouchableOpacity>
        </View>
      </View>
    </IndeksBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    paddingLeft: 15,
    width: "100%",
    fontSize: 32,
    color: colors.white,
    fontFamily: fonts.primaryBold,
    //marginBottom: 10,
  },
  mainLink: {
    justifyContent: "center",
    width: "100%",
    borderTopWidth: 3,
    borderColor: colors.primary,
    flexDirection: "row",
  },
  line: {
    width: "100%",
    height: 3,
    backgroundColor: colors.primary,
    marginBottom: -20,
    marginTop: 0,
  },
  inputs: {
    width: "100%",
  },
  input: {
    marginBottom: 20,
  },
  saveButton: {
    width: "65%",
    marginVertical: 20,
    marginTop: 40,
  },
  backToLoginText: {
    color: colors.primary,
    fontFamily: fonts.primaryBold,
    fontSize: 18,
    //marginTop: 20,
  },
});

export default NewPasswordScreen;

import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import fonts from "../config/fonts";
import IndeksBackground from "../components/IndeksBackground";
import LogoWithTitleComponent from "../components/LogoWithTitleComponent";
import colors from "../config/colors";
import IndeksTextInput from "../components/IndeksTextInput";
import BigBasicButtonComponent from "../components/BigBasicButtonComponent";
import TokenService from "../services/TokenService";
import HttpService from "../services/HttpService";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const handleLoginPress = async () => {
    try {
      // const response = await HttpService.create("/login", { email, password });
      //const token = response.data.token;

      //await TokenService.saveToken(token);
      navigation.navigate("ChatList");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleRegisterPress = () => {
    navigation.navigate("Register");
  };

  const handleForgotPasswordPress = () => {
    navigation.navigate("ResetPassword");
  };

  return (
    <IndeksBackground>
      <LogoWithTitleComponent style={styles.logoContainer} />
      <View style={styles.container}>
        <Text style={styles.title}>Prijava</Text>
        <View style={styles.inputs}>
          <IndeksTextInput
            placeholder="E-Mail"
            value={email}
            onChangeText={setEmail}
            style={styles.usernameInput}
          />
          <IndeksTextInput
            placeholder="Lozinka"
            secureTextEntry={true}
            value={password}
            onChangeText={setPassword}
          />
        </View>
        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={handleForgotPasswordPress}
        >
          <Text style={styles.forgotPassword}>Zaboravljena šifra?</Text>
        </TouchableOpacity>
        <BigBasicButtonComponent
          style={styles.loginButton}
          onPress={handleLoginPress}
        >
          PRIJAVI SE
        </BigBasicButtonComponent>

        <View style={styles.loginLink}>
          <Text style={styles.accountText}>Nemate nalog?</Text>
          <TouchableOpacity onPress={handleRegisterPress}>
            <Text style={styles.createAccount}>Kreirajte nalog</Text>
          </TouchableOpacity>
        </View>
      </View>
    </IndeksBackground>
  );
};

const styles = StyleSheet.create({
  accountText: {
    color: colors.black,
    fontFamily: fonts.primaryMedium,
    fontSize: 18,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "60%",
    marginVertical: 20,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  createAccount: {
    color: colors.primary,
    fontFamily: fonts.primaryBold,
    fontSize: 18,
    paddingLeft: 10,
  },
  forgotPassword: {
    color: colors.primary,
    fontFamily: fonts.primaryBold,
    fontSize: 14,
  },
  forgotPasswordButton: {
    alignSelf: "flex-end",
    paddingRight: 10,
  },
  inputs: {
    width: "100%",
  },
  line: {
    width: "100%",
    height: 3,
    backgroundColor: colors.primary,
    marginBottom: -20,
    marginTop: 0,
  },
  loginButton: {
    width: "65%",
    marginVertical: 20,
    marginTop: 40,
  },
  loginLink: {
    justifyContent: "center",
    width: "100%",
    borderTopWidth: 3,
    borderColor: colors.primary,
    flexDirection: "row",
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
  },
  usernameInput: { marginBottom: 25 },
});

export default LoginScreen;

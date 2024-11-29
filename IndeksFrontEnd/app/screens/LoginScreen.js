import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import fonts from "../config/fonts";
import IndeksBackground from "../components/IndeksBackground";
import LogoWithTitleComponent from "../components/LogoWithTitleComponent";
import colors from "../config/colors";
import IndeksTextInput from "../components/IndeksTextInput";
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
      //TODO: Implementirati ekran za ovo
    console.log("Nije implementirano");
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
        <TouchableOpacity style={styles.loginButton} onPress={handleLoginPress}>
          <Text style={styles.loginText}>PRIJAVI SE</Text>
        </TouchableOpacity>

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
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
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
  loginText: {
    color: colors.white,
    fontFamily: fonts.primaryBold,
    fontSize: 26,
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

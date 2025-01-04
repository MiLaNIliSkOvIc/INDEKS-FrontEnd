import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { jwtDecode } from "jwt-decode";

import fonts from "../config/fonts";
import IndeksBackground from "../components/IndeksBackground";
import LogoWithTitleComponent from "../components/LogoWithTitleComponent";
import colors from "../config/colors";
import IndeksTextInput from "../components/IndeksTextInput";
import BigBasicButtonComponent from "../components/BigBasicButtonComponent";
import authApi from "../api/auth";
import AuthContext from "../auth/context";
import authStorage from "../auth/storage";

const LoginScreen = () => {
  const authContext = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();

  const [keyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
    const showKeyboard = Keyboard.addListener("keyboardDidShow", () => {
      setKeyboardVisible(true);
    });
    const hideKeyboard = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      showKeyboard.remove();
      hideKeyboard.remove();
    };
  }, []);

  const handleLoginPress = async () => {
    try {
      console.log(email + " " + password);
      const response = await authApi.login(email, password);
      const token = response.token;

      if (token) {
        authStorage.storeToken(token);
        console.log("Token saved successfully");

        const user = jwtDecode(token);
        console.log(user);
        authContext.setUser(user);
      } else {
        console.error("Login response does not contain a token");
      }
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
            keyboardType="email-address"
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
      </View>
      {keyboardVisible ? null : (
        <View style={styles.loginLink}>
          <Text style={styles.accountText}>Nemate nalog?</Text>
          <TouchableOpacity onPress={handleRegisterPress}>
            <Text style={styles.createAccount}>Kreirajte nalog</Text>
          </TouchableOpacity>
        </View>
      )}
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
    flexBasis: "25%",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
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
    marginVertical: 10,
  },
  loginLink: {
    justifyContent: "center",
    marginHorizontal: 20,
    marginBottom: 15,
    borderTopWidth: 3,
    borderColor: colors.primary,
    flexDirection: "row",
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  title: {
    paddingBottom: 5,
    paddingLeft: 15,
    width: "100%",
    fontSize: 32,
    color: colors.white,
    fontFamily: fonts.primaryBold,
  },
  usernameInput: { marginBottom: 25 },
});

export default LoginScreen;

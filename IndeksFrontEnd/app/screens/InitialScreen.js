import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import fonts from "../config/fonts";

const InitialScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Login");
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <ImageBackground
      source={require("../assets/images/background.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.indexText}>INDEKS</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    backgroundColor: "#223364",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 150,
    marginTop: 50,
    marginBottom: 20,
  },

  indexText: {
    fontSize: 60,
    lineHeight: 80,
    fontFamily: fonts.primary,
    fontWeight: "400",
    color: "#013868",
    marginBottom: 100,
    marginTop: -30,
    borderRadius: 20,
    textShadowColor: "#000000",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
  },
});

export default InitialScreen;

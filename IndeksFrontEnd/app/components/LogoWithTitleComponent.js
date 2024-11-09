import React from "react";
import { View, Image, StyleSheet, Text } from "react-native";
import fonts from "../config/fonts";
import colors from "../config/colors";

function LogoWithTitleComponent() {
  return (
    <View style={styles.logoContainer}>
      <Image
        style={styles.logo}
        source={require("../assets/images/logo.png")}
      />

      <Text style={styles.indexText}>INDEKS</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 76,
    height: 55,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  indexText: {
    fontSize: 50,
    fontFamily: fonts.primarySemiBold,
    color: colors.primary,
  },
});
export default LogoWithTitleComponent;

import BigBasicButtonComponent from "../components/BigBasicButtonComponent";
import IndeksBackground from "../components/IndeksBackground";
import IndeksTextInput from "../components/IndeksTextInput";
import LogoWithTitleComponent from "../components/LogoWithTitleComponent";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../config/colors";
import fonts from "../config/fonts";
import { useState, useEffect } from "react";

export default function ResetPasswordScreen() {
  const navigation = useNavigation();
  const handleConfirmPress = () => {
    navigation.navigate("NewPassword");
  };
  const handleBackToLoginPress = () => {
    navigation.navigate("Login");
  };
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

  return (
    <IndeksBackground>
      <LogoWithTitleComponent style={styles.logoContainer} />
      <View style={styles.container}>
        <Text style={styles.title}>Oporavak lozinke</Text>
        <IndeksTextInput placeholder="E-Mail" />
        <BigBasicButtonComponent style={styles.button}>
          POŠALJI KOD
        </BigBasicButtonComponent>
        <IndeksTextInput placeholder="Kod" />
        <BigBasicButtonComponent
          style={styles.button}
          onPress={handleConfirmPress}
        >
          POTVRDI
        </BigBasicButtonComponent>
        {keyboardVisible ? null : (
          <View style={styles.footer}>
            <TouchableOpacity onPress={handleBackToLoginPress}>
              <Text style={styles.footerText}>Vrati se na prijavu</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </IndeksBackground>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "65%",
    marginVertical: 15,
  },
  container: {
    flex: 3,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  logoContainer: {
    flex: 2,
    alignContent: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  title: {
    fontSize: 32,
    width: "100%",
    paddingLeft: 15,
    color: colors.white,
    fontFamily: fonts.primaryBold,
    marginBottom: 10,
  },
  footer: {
    position: "absolute",
    bottom: 10,
    alignItems: "center",
    width: "100%",
    borderTopWidth: 2,
    borderColor: colors.primary,
  },
  footerText: {
    color: colors.primary,
    fontFamily: fonts.primaryBold,
    fontSize: 18,
  },
});

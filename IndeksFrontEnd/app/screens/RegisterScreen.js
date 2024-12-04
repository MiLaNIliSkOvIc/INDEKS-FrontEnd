import { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import fonts from "../config/fonts";
import IndeksBackground from "../components/IndeksBackground";
import colors from "../config/colors";
import IndeksTextInput from "../components/IndeksTextInput";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import BigBasicButtonComponent from "../components/BigBasicButtonComponent";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [userAccountSelected, setUserAccountSelected] = useState(true);

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
  const handleLoginPress = () => {
    navigation.navigate("Login"); // Navigacija na Login ekran
  };

  const handleUserAccountSelect = () => {
    if (!userAccountSelected) {
      setUserAccountSelected(true);
    }
  };
  const handleInstructorAccountSelect = () => {
    if (userAccountSelected) {
      setUserAccountSelected(false);
    }
  };
  return (
    <IndeksBackground>
      <View style={styles.container}>
        <Text style={styles.title}>Registracija</Text>
        <IndeksTextInput placeholder="Ime" style={styles.input} />
        <IndeksTextInput placeholder="Prezime" style={styles.input} />
        <IndeksTextInput placeholder="E-Mail" style={styles.input} />
        <IndeksTextInput
          placeholder="Lozinka"
          style={styles.input}
          secureTextEntry={true}
        />
        <IndeksTextInput
          placeholder="Ponovi lozinku"
          style={styles.input}
          secureTextEntry={true}
        />
        <View style={styles.buttonsContainer}>
          <TouchableHighlight
            style={[
              styles.iconButton,
              styles.iconButtonLeft,
              {
                backgroundColor: userAccountSelected
                  ? colors.white
                  : colors.primary,
              },
            ]}
            onPress={handleUserAccountSelect}
          >
            <View style={styles.iconButtonContent}>
              <FontAwesome5
                name="user-graduate"
                size={30}
                color={userAccountSelected ? colors.primary : colors.white}
              />
              <Text
                style={[
                  styles.iconButtonText,
                  {
                    color: userAccountSelected ? colors.primary : colors.white,
                  },
                ]}
              >
                Student
              </Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight
            style={[
              styles.iconButton,
              styles.iconButtonRight,
              {
                backgroundColor: userAccountSelected
                  ? colors.primary
                  : colors.white,
              },
            ]}
            onPress={handleInstructorAccountSelect}
          >
            <View style={styles.iconButtonContent}>
              <FontAwesome5
                name="book-reader"
                size={30}
                color={userAccountSelected ? colors.white : colors.primary}
              />
              <Text
                style={[
                  styles.iconButtonText,
                  {
                    color: userAccountSelected ? colors.white : colors.primary,
                  },
                ]}
              >
                Instruktor
              </Text>
            </View>
          </TouchableHighlight>
        </View>
        <BigBasicButtonComponent style={styles.registerButton}>
          REGISTRUJ SE
        </BigBasicButtonComponent>
      </View>
      {keyboardVisible ? null : (
        <View style={styles.footer}>
          <Text style={styles.footerText}>Imate nalog?</Text>
          <TouchableOpacity onPress={handleLoginPress}>
            <Text style={styles.footerLink}>Prijavite se</Text>
          </TouchableOpacity>
        </View>
      )}
    </IndeksBackground>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "60%",
    marginTop: 15,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  footer: {
    justifyContent: "center",
    marginHorizontal: 20,
    marginBottom: 15,
    borderTopWidth: 3,
    borderColor: colors.primary,
    flexDirection: "row",
  },
  footerLink: {
    color: colors.primary,
    fontFamily: fonts.primaryBold,
    fontSize: 18,
    paddingLeft: 10,
  },
  footerText: {
    color: colors.black,
    fontFamily: fonts.primaryMedium,
    fontSize: 18,
  },
  iconButton: {
    width: "40%",
    height: 50,
    justifyContent: "center",
  },
  iconButtonContent: {
    alignItems: "center",
  },
  iconButtonLeft: {
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  iconButtonRight: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  iconButtonText: {
    fontFamily: fonts.primaryBold,
    fontSize: 10,
  },
  input: {
    marginVertical: 7,
  },
  logoContainer: {
    height: "25%",
    paddingBottom: 60,
    alignItems: "center",
    padding: 30,
  },
  registerButton: {
    width: "65%",
    marginTop: 20,
  },
  title: {
    fontSize: 32,
    paddingLeft: 15,
    color: colors.white,
    fontFamily: fonts.primaryBold,
    width: "100%",
    marginBottom: 10,
  },
});

export default RegisterScreen;

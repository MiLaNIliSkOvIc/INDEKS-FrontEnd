import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import fonts from "../config/fonts";
import IndeksBackground from "../components/IndeksBackground";
import LogoWithTitleComponent from "../components/LogoWithTitleComponent";
import colors from "../config/colors";
import IndeksTextInput from "../components/IndeksTextInput";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [userAccountSelected, setUserAccountSelected] = useState(true);
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
        <LogoWithTitleComponent style={styles.logoContainer} />
        <Text style={styles.title}>Registracija</Text>
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
            <FontAwesome5
              name="user-graduate"
              size={30}
              color={userAccountSelected ? colors.primary : colors.white}
            />
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
            <FontAwesome5
              name="book-reader"
              size={30}
              color={userAccountSelected ? colors.white : colors.primary}
            />
          </TouchableHighlight>
        </View>
        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.registerText}>REGISTRUJ SE</Text>
        </TouchableOpacity>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Imate nalog?</Text>
          <TouchableOpacity onPress={handleLoginPress}>
            <Text style={styles.footerLink}>Prijavite se</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    width: "100%",
    borderTopWidth: 3,
    borderColor: colors.primary,
    flexDirection: "row",
    marginTop: 20,
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
  input: {
    marginVertical: 7,
  },
  logoContainer: {
    justifyContent: "flex-end",
    height: "35%",
    paddingBottom: 60,
  },
  registerButton: {
    width: "65%",
    height: 50,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginTop: 20,
  },
  registerText: {
    color: colors.white,
    fontFamily: fonts.primaryBold,
    fontSize: 25,
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

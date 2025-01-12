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
import { Formik } from "formik";
import * as Yup from "yup";

import IndeksBackground from "../components/IndeksBackground";
import colors from "../config/colors";
import IndeksTextInput from "../components/IndeksTextInput";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import BigBasicButtonComponent from "../components/BigBasicButtonComponent";
import authApi from "../api/auth";

Yup.setLocale({
  mixed: {
    required: 'Polje "${label}" je obavezno.',
  },
  string: {
    email: "Unesite ispravnu e-mail adresu.",
    min: 'Polje "${label}" mora sadržavati najmanje ${min} karaktera.',
    oneOf: 'Polje "${label}" mora se poklapati sa lozinkom.',
  },
});

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required().label("Ime"),
  lastName: Yup.string().required().label("Prezime"),
  //TODO: Dodati da mora biti student.etf.unibl.org
  email: Yup.string().required().email().label("E-Mail"),
  password: Yup.string().required().min(8).label("Lozinka"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password"), null])
    .required()
    .label("Ponovljena lozinka"),
});

const RegisterScreen = () => {
  const navigation = useNavigation();

  const [userAccountSelected, setUserAccountSelected] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

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
    navigation.navigate("Login");
  };

  const handleRegisterPress = async () => {
    try {
      if (password !== repeatPassword) {
        setPasswordError("Lozinke se ne poklapaju.");
        return;
      }
      setPasswordError("");
      const accountType = userAccountSelected ? "STUDENT" : "TUTOR";
      console.log(firstName + lastName + email + password + accountType);
      const response = await authApi.register(
        firstName,
        lastName,
        email,
        password,
        accountType
      );
      console.log(response.message);
      navigation.navigate("Login");
    } catch (error) {
      console.error("Registration failed", error);
    }
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
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            repeatPassword: "",
          }}
          onSubmit={handleRegisterPress}
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            handleSubmit,
            errors,
            touched,
            setFieldTouched,
          }) => {
            <>
              <IndeksTextInput
                placeholder="Ime"
                style={styles.input}
                onChangeText={handleChange("firstName")}
                onBlur={() => setFieldTouched("firstName")}
              />
              <IndeksTextInput
                placeholder="Prezime"
                style={styles.input}
                onChangeText={handleChange("lastName")}
                onBlur={() => setFieldTouched("lastName")}
              />
              <IndeksTextInput
                placeholder="E-Mail"
                style={styles.input}
                onChangeText={handleChange("email")}
                onBlur={() => setFieldTouched("email")}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <IndeksTextInput
                placeholder="Lozinka"
                style={styles.input}
                secureTextEntry={true}
                onChangeText={handleChange("password")}
                onBlur={() => setFieldTouched("password")}
                autoCapitalize="none"
              />
              <IndeksTextInput
                placeholder="Ponovljena lozinka"
                style={styles.input}
                secureTextEntry={true}
                onChangeText={handleChange("repeatPassword")}
                onBlur={() => setFieldTouched("repeatPassword")}
                autoCapitalize="none"
              />
              {/* <View style={styles.buttonsContainer}>
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
        </View> */}
              {passwordError ? (
                <Text style={styles.errorText}>{passwordError}</Text>
              ) : null}
              <BigBasicButtonComponent
                style={styles.registerButton}
                onPress={handleRegisterPress}
              >
                REGISTRUJ SE
              </BigBasicButtonComponent>
            </>;
          }}
        </Formik>
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
  errorText: {
    color: "red",
    marginTop: 5,
    marginRight: 10,
    alignSelf: "flex-end",
    fontFamily: fonts.primaryBold,
    fontSize: 14,
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

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
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../config/colors";
import fonts from "../config/fonts";
import { useState, useEffect } from "react";
import HttpService from "../services/HttpService";
import { Formik } from "formik";
import * as Yup from "yup";

Yup.setLocale({
  mixed: {
    required: "Polje ${label} je obavezno.",
  },
  string: {
    email: "Unesite ispravnu e-mail adresu.",
  },
});

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("E-Mail"),
});

export default function ResetPasswordScreen() {
  const navigation = useNavigation();

  const [resetPasswordError, setResetPasswordError] = useState("");
  const [emailInputEnabled, setEmailInputEnabled] = useState(true);
  const handleConfirmPress = () => {
    navigation.navigate("NewPassword");
  };

  const handleBackToLoginPress = () => {
    navigation.navigate("Login");
  };
  const handleSendCodePress = async ({ email }) => {
    setEmailInputEnabled(false);
    HttpService.create(`userAccount/password-recovery?email=${email}`);
    Alert.alert(
      "Kod za oporavak lozinke je poslan na uneseni imejl.",
      "Pratite dalja uputstva za oporavak lozinke.",
      [{ text: "OK", onPress: () => console.log("OK Pressed") }]
    );
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
        <Formik
          initialValues={{ email: "" }}
          onSubmit={(values) => handleSendCodePress(values)}
          validationSchema={validationSchema}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <IndeksTextInput
                placeholder="E-Mail"
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                editable={emailInputEnabled}
              />
              {touched.email && errors.email && (
                <Text style={{ color: "red", marginBottom: 10 }}>
                  {errors.email}
                </Text>
              )}
              <BigBasicButtonComponent
                style={styles.button}
                onPress={handleSubmit}
              >
                POŠALJI KOD
              </BigBasicButtonComponent>
            </>
          )}
        </Formik>
      </View>
      {keyboardVisible ? null : (
        <View style={styles.footer}>
          <TouchableOpacity onPress={handleBackToLoginPress}>
            <Text style={styles.footerText}>Vrati se na prijavu</Text>
          </TouchableOpacity>
        </View>
      )}
    </IndeksBackground>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "85%",
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
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 15,
    borderTopWidth: 2,
    borderColor: colors.primary,
  },
  footerText: {
    color: colors.primary,
    fontFamily: fonts.primaryBold,
    fontSize: 18,
  },
});

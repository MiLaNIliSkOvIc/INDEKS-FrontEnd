import IndeksBackground from "../components/IndeksBackground";
import IndeksTextInput from "../components/IndeksTextInput";
import LogoWithTitleComponent from "../components/LogoWithTitleComponent";
import { StyleSheet, View } from "react-native";

export default function ResetPasswordScreen() {
  return (
    <IndeksBackground>
      <LogoWithTitleComponent style={styles.logoContainer} />
      <View style={styles.container}>
        <IndeksTextInput placeholder="E-Mail" />
      </View>
    </IndeksBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  logoContainer: {
    paddingVertical: 40,
    borderWidth: 1,
  },
});

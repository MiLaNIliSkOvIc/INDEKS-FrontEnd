import BigBasicButtonComponent from "../components/BigBasicButtonComponent";
import IndeksBackground from "../components/IndeksBackground";
import IndeksTextInput from "../components/IndeksTextInput";
import LogoWithTitleComponent from "../components/LogoWithTitleComponent";
import { StyleSheet, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ResetPasswordScreen() {
  const navigation = useNavigation();
  const handleConfirmPress = () => {
    navigation.navigate("NewPassword");
  };

  return (
    <IndeksBackground>
      <LogoWithTitleComponent style={styles.logoContainer} />
      <View style={styles.container}>
        <Text>Oporavak lozinke</Text>
        <IndeksTextInput placeholder="E-Mail" />
        <BigBasicButtonComponent>POŠALJI KOD</BigBasicButtonComponent>
        <IndeksTextInput placeholder="Kod" />
        <BigBasicButtonComponent onPress={handleConfirmPress}>
          POTVRDI
        </BigBasicButtonComponent>
        <View>
          <Text>Vrati se na prijavu</Text>
        </View>
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

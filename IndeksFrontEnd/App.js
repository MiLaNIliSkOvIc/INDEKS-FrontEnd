// App.js
import { React, useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

import AppNavigator from "./app/navigation/AppNavigator";
import LogoWithTitleComponent from "./app/components/LogoWithTitleComponent";
import InitialScreen from "./app/screens/InitialScreen";

const Stack = createStackNavigator();
SplashScreen.preventAutoHideAsync();

const App = () => {
  const [loaded, error] = useFonts({
    Kodchasan: require("./app/assets/fonts/KodchasanRegular.ttf"),
    KodchasanMedium: require("./app/assets/fonts/KodchasanMedium.ttf"),
    KodchasanSemiBold: require("./app/assets/fonts/KodchasanSemiBold.ttf"),
    KodchasanBold: require("./app/assets/fonts/KodchasanBold.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return <AppNavigator />;
};

export default App;

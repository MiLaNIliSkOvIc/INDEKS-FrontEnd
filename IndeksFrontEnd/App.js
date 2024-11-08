// App.js
import { React, useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { View, Text } from "react-native";
import * as Font from "expo-font";

import AppNavigator from "./app/navigation/AppNavigator";

const Stack = createStackNavigator();

const App = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Kodchasan: require("./app/assets/fonts/Kodchasan-Regular.ttf"),
        "Kodchasan-Bold": require("./app/assets/fonts/Kodchasan-Bold.ttf"),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);
  return <AppNavigator />;
};

export default App;

// App.js
import { React, useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { jwtDecode } from "jwt-decode";

import AuthNavigator from "./app/navigation/AuthNavigator";
import AuthContext from "./app/auth/context";
import StudentAppNavigator from "./app/navigation/StudentAppNavigator";
import authStorage from "./app/auth/storage";

const Stack = createStackNavigator();
SplashScreen.preventAutoHideAsync();

const App = () => {
  const [loaded, error] = useFonts({
    Kodchasan: require("./app/assets/fonts/KodchasanRegular.ttf"),
    KodchasanMedium: require("./app/assets/fonts/KodchasanMedium.ttf"),
    KodchasanSemiBold: require("./app/assets/fonts/KodchasanSemiBold.ttf"),
    KodchasanBold: require("./app/assets/fonts/KodchasanBold.ttf"),
  });

  const [user, setUser] = useState();

  const restoreToken = async () => {
    const token = await authStorage.getToken();
    if (!token) return;
    setUser(jwtDecode(token));
  };

  useEffect(() => {
    restoreToken();
  }, []);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        {user ? <StudentAppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;

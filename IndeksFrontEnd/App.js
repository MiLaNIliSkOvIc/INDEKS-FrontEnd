// App.js
import { React, useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { NavigationContainer } from "@react-navigation/native";
import { jwtDecode } from "jwt-decode";

import AuthNavigator from "./app/navigation/AuthNavigator";
import AuthContext from "./app/auth/context";
import StudentAppNavigator from "./app/navigation/StudentAppNavigator";
import TutorAppNavigator from "./app/navigation/TutorAppNavigator";
import AdminAppNavigator from "./app/navigation/AdminAppNavigator";
import authStorage from "./app/auth/storage";

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
    console.log(jwtDecode(token));
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
        {user ? renderAppNavigator(user.accountType) : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );

  function renderAppNavigator(accountType) {
    switch (accountType) {
      case "STUDENT":
        return <StudentAppNavigator />;
      case "TUTOR":
        return <TutorAppNavigator />;
      case "ADMIN":
        return <AdminAppNavigator />;
      default:
        return <AuthNavigator />;
    }
  }
};

export default App;

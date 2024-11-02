// App.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import AppNavigator from "./app/navigation/AppNavigator";

const Stack = createStackNavigator();

const App = () => {
  return <AppNavigator />;
};

export default App;

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import RegisterScreen from "../app/screens/RegisterScreen";
import LoginScreen from "../app/screens/LoginScreen";
import InitialScreen from "../app/screens/InitialScreen";
import ChatList from "../app/screens/ChatListScreen";
import ChatScreen from "../app/screens/ChatScreen";
import MaterialsScreen from "../Materijali/Materijali";
import GodinaScreen from "../Materijali/GodinaScreen";
import Schedule from "../Schedule/Schedule";
import Instruction from "../Instructor/Instruction";
import InstructionInfo from "../Instructor/InstructionInfo";
import ElementaryGroupChatScreen from "../app/screens/ElementaryGroupsListScreen";
import AnnouncementsList from "../Ads/AnnouncementsList";
import HeaderComponent from "../app/components/HeaderComponent";
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicial">
        <Stack.Screen
          name="Inicial"
          component={Instruction}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ChatList"
          component={ChatList}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Chat"
          component={ChatScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Materijali"
          component={MaterialsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="GodinaScreen"
          component={GodinaScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Schedule"
          component={Schedule}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Instruction"
          component={Instruction}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InstructionInfo"
          component={InstructionInfo}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ElementaryGroupChat"
          component={ElementaryGroupChatScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Ads"
          component={AnnouncementsList}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

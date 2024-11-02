import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import InitialScreen from "../screens/InitialScreen";
import ChatList from "../screens/ChatListScreen";
import ChatScreen from "../screens/ChatScreen";
import MaterialsScreen from "../screens/MaterialsScreen";
import GodinaScreen from "../screens/GodinaScreen";
import ScheduleScreen from "../screens/ScheduleScreen";
import Instruction from "../../Instructor/Instruction";
import InstructionInfo from "../../Instructor/InstructionInfo";
import ElementaryGroupChatScreen from "../screens/ElementaryGroupsListScreen";
import AnnouncementsList from "../../Ads/AnnouncementsList";
import HeaderComponent from "../components/HeaderComponent";
const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Initial">
        <Stack.Screen
          name="Initial"
          component={InitialScreen}
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
          component={ScheduleScreen}
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

import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import RegisterScreen from "../screens/RegisterScreen";
import LoginScreen from "../screens/LoginScreen";
import InitialScreen from "../screens/InitialScreen";
import ChatList from "../screens/ChatListScreen";
import ChatScreen from "../screens/ChatScreen";
import MaterialsScreen from "../screens/MaterialsScreen";
import ViewProblemsScreen from "../screens/ViewProblemsScreen";
import GodinaScreen from "../screens/GodinaScreen";
import ScheduleScreen from "../screens/ScheduleScreen";
import InstructionsListScreen from "../screens/InstructionsListScreen";
import InstructionDetailsScreen from "../screens/InstructionDetailsScreen";
import ElementaryGroupChatScreen from "../screens/ElementaryGroupsListScreen";
import AnnouncementsListScreen from "../screens/AnnouncementsListScreen";
import HeaderComponent from "../components/HeaderComponent";
import InstructorProfileScreen from "../screens/InstructorProfileScreen";

import ReportedCommentsScreen from "../screens/ReportedCommentsScreen";
import ReportedMaterialsScreen from "../screens/ReportedMaterialsScreen";
import ReportedUsersScreen from "../screens/ReportedUsersScreen";
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
          component={InstructionsListScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="InstructionInfo"
          component={InstructionDetailsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ElementaryGroupChat"
          component={ElementaryGroupChatScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Ads"
          component={AnnouncementsListScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Problems"
          component={ViewProblemsScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="ReportedCommentsScreen"
          component={ReportedCommentsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ReportedMaterialsScreen"
          component={ReportedMaterialsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ReportedUsersScreen"
          component={ReportedUsersScreen}
          options={{ headerShown: false }}
        />
          <Stack.Screen
          name="InstructorProfileScreen"
          component={InstructorProfileScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

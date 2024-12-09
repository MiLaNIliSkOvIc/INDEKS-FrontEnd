import { createStackNavigator } from "@react-navigation/stack";

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
import InstructorProfileScreen from "../screens/InstructorProfileScreen";

import ReportedCommentsScreen from "../screens/ReportedCommentsScreen";
import ReportedMaterialsScreen from "../screens/ReportedMaterialsScreen";
import ReportedUsersScreen from "../screens/ReportedUsersScreen";
import SearchScreen from "../screens/SearchScreen";
import NewPrivateGroupScreen from "../screens/NewPrivateGroupScreen";

const Stack = createStackNavigator();

export default function StudentAppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ChatList" component={ChatList} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="Materijali" component={MaterialsScreen} />
      <Stack.Screen name="GodinaScreen" component={GodinaScreen} />
      <Stack.Screen name="Schedule" component={ScheduleScreen} />
      <Stack.Screen name="Instruction" component={InstructionsListScreen} />
      <Stack.Screen
        name="InstructionInfo"
        component={InstructionDetailsScreen}
      />
      <Stack.Screen
        name="ElementaryGroupChat"
        component={ElementaryGroupChatScreen}
      />
      <Stack.Screen name="Ads" component={AnnouncementsListScreen} />
      <Stack.Screen name="Problems" component={ViewProblemsScreen} />

      <Stack.Screen
        name="ReportedCommentsScreen"
        component={ReportedCommentsScreen}
      />
      <Stack.Screen
        name="ReportedMaterialsScreen"
        component={ReportedMaterialsScreen}
      />
      <Stack.Screen
        name="ReportedUsersScreen"
        component={ReportedUsersScreen}
      />
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
      <Stack.Screen
        name="NewPrivateGroupScreen"
        component={NewPrivateGroupScreen}
      />
      <Stack.Screen
        name="InstructorProfileScreen"
        component={InstructorProfileScreen}
      />
    </Stack.Navigator>
  );
}

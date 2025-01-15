import { createStackNavigator } from "@react-navigation/stack";
import ChatScreen from "../screens/ChatScreen";
import MaterialsScreen from "../screens/MaterialsScreen";
import ViewProblemsScreen from "../screens/ViewProblemsScreen";
import MaterialsYearsItemsScreen from "../screens/MaterialsYearsItemsScreen";
import InstructionsListScreen from "../screens/InstructionsListScreen";
import InstructionDetailsScreen from "../screens/InstructionDetailsScreen";
import ElementaryGroupChatScreen from "../screens/ElementaryGroupsListScreen";
import InstructorProfileScreen from "../screens/InstructorProfileScreen";

import ReportedCommentsScreen from "../screens/ReportedCommentsScreen";
import ReportedMaterialsScreen from "../screens/ReportedMaterialsScreen";
import ReportedUsersScreen from "../screens/ReportedUsersScreen";
import RegisteredUsersScreen from "../screens/RegisteredUsersScreen";

const Stack = createStackNavigator();

export default function AdminAppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="ElementaryGroupChat"
        component={ElementaryGroupChatScreen}
      />
      <Stack.Screen name="Materijali" component={MaterialsScreen} />
      <Stack.Screen
        name="RegisteredUsersScreen"
        component={RegisteredUsersScreen}
      />
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
    </Stack.Navigator>
  );
}

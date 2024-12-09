import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export default function AdminAppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}></Stack.Navigator>
  );
}

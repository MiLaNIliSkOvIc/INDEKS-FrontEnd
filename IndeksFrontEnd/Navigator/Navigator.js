import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import RegisterScreen from '../StartPages/RegisterScreen';
import LoginPage from '../StartPages/LoginPage';
import InicialPage from '../StartPages/InicialPage';
import ChatList from '../ChatComponents/ChatList';
import ChatComponent from '../ChatComponents/messageComp';
import MaterialsScreen from '../Materijali/Materijali'
import GodinaScreen from '../Materijali/PrvaGodinaComponent'
import Schedule from '../Schedule/Schedule'
import Instruction from '../Instructor/Instruction';
import InstructionInfo from '../Instructor/InstructionInfo';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicial">
      <Stack.Screen name="Inicial" component={InicialPage} options={{ headerShown: false }} 
        />
        <Stack.Screen name="Login" component={LoginPage} options={{ headerShown: false }} 
        />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="ChatList" component={ChatList} options={{ headerShown: false }}/>
        <Stack.Screen name="Chat" component={ChatComponent} options={{ headerShown: false }}/>
        <Stack.Screen name="Materijali" component={MaterialsScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="PrvaGodina" component={GodinaScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Schedule" component={Schedule} options={{ headerShown: false }}/>
        <Stack.Screen name="Instruction" component={Instruction} options={{ headerShown: false }}/>
        <Stack.Screen name="InstructionInfo" component={InstructionInfo} options={{ headerShown: false }}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;

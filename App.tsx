// App.js
import 'react-native-gesture-handler'
import React,{useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/LoginScreen';
import Dashboard from './src/Dashboard';
import GmailIdScreen from './src/GmailIdScreen';
import AppInstructionsScreen from './src/AppInstructionsScreen';
import Carousel from './src/components/CustomCard'
import { getData } from './src/config/AsyncStorage';
const Stack = createStackNavigator();



const App = () => {
  const [naviagte, setNavigate] = useState(true)
  useEffect(()=>{
    onNaviagtionToDashboard()
  }, [])

  const onNaviagtionToDashboard = async() => {
     const res = await getData('Dashboard')

    }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GmailIdScreen">
        <Stack.Screen name="Carousel" component={Carousel} options={{headerShown: false}}/>
        <Stack.Screen name="GmailIdScreen" component={GmailIdScreen} options={{headerShown: false}}/>
        <Stack.Screen name="InstructionsScreen" component={AppInstructionsScreen} options={{headerShown: false}} />
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}/>
        <Stack.Screen name="Dashboard" component={Dashboard} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

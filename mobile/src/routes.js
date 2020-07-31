import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons'

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import Dashboard from './pages/Dashboard';
import Registrations from './pages/Registrations';
import Profile from './pages/Profile';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function Routes(props){
 return(
  <NavigationContainer>
   {props.isSigned ? (
    <Tab.Navigator
      resetOnBlur={true}
      tabBarOptions={{
        keyboardHidesTabBar: true,
        activeTintColor: '#FFF',
        inactiveTintColor: 'rgba(255, 255, 255, 0.6)',
        style: {
          backgroundColor: '#8d41a8',
          borderTopWidth: 0,
        }
      }}>
      <Tab.Screen 
        name="DashboardScreen" 
        component={Dashboard}
        options={{
          tabBarLabel: 'Dashboard', 
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
      }} />
      <Tab.Screen 
        name="RegistrationsScreen" 
        component={Registrations}
        options={{
          tabBarLabel: 'Inscrições', 
          tabBarIcon: ({ color, size }) => (
            <Icon name="event" size={size} color={color} />
          ),
        }} />
      <Tab.Screen 
        name="Perfil" 
        component={Profile}
        options={{
          tabBarLabel: 'Perfil', 
          tabBarIcon: ({ color, size }) => (
            <Icon name="person" size={size} color={color} />
          ),
        }} />
    </Tab.Navigator>
   ): (
    <Stack.Navigator screenOptions={{
      headerShown: false
    }}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
   )}
  </NavigationContainer>
  );
}
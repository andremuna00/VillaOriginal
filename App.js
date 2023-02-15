import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {  HomeScreen } from './src/screens'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false}}>
          <>
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
          </>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

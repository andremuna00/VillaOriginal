import 'react-native-gesture-handler';
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {  HomeScreen, LoginScreen, RegisterScreen, PeopleScreen, EditPeopleScreen, ListPeopleScreen,EditItemsShoppingScreen,EditPartyScreen,ListGuestsScreen } from './src/screens'
import {ListPartyScreen, ManageListGuestsScreen, ManagePartyScreen, ManageShoppingListScreen, PartyScreen, ShoppingListScreen, AddGuestsScreen, AddShoppingItemScreen} from './src/screens'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false}}>
          <>
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="People" component={PeopleScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="EditPeople" component={EditPeopleScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="ListPeople" component={ListPeopleScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="EditItemsShopping" component={EditItemsShoppingScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="EditParty" component={EditPartyScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="ListGuests" component={ListGuestsScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="ListParty" component={ListPartyScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="ManageListGuests" component={ManageListGuestsScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="ManageParty" component={ManagePartyScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="ManageShoppingList" component={ManageShoppingListScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="Party" component={PartyScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="ShoppingList" component={ShoppingListScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="AddGuests" component={AddGuestsScreen} options={{ headerShown: false }}/>
            <Stack.Screen name="AddShoppingItem" component={AddShoppingItemScreen} options={{ headerShown: false }}/>
          </>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

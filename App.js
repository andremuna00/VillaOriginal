import 'react-native-gesture-handler';
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {  HomeScreen, LoginScreen, RegisterScreen, PeopleScreen, EditPeopleScreen, ListPeopleScreen,EditItemsShoppingScreen,EditPartyScreen,ListGuestsScreen } from './src/screens'
import {ListPartyScreen, ManageListGuestsScreen, ManagePartyScreen, ManageShoppingListScreen, PartyScreen,Analytics, ShoppingListScreen, AddGuestsScreen, AddShoppingItemScreen, ManageScreen} from './src/screens'
import data from './data.js'
import { firebase } from './src/firebase/config';
const Stack = createStackNavigator();

export default function App() {

    useEffect(() => {
        // persons = [];
        // data["Lista 231223"].forEach((person) => {
        //     if(person["NOMI"] != "" && person["NOMI"] != " " && person["NOMI"]!=undefined)
        //     {
        //         var name = person["NOMI"].split(" ")[0];
        //         var surname = "";
        //         if (person["NOMI"].includes(" "))
        //         {
        //             name = person["NOMI"].split(" ")[1];
        //             surname = person["NOMI"].split(" ")[0];
        //         }
        //         var sesso = ""
        //         if (person["SESSO"] != "" && person["SESSO"] != " " && person["SESSO"]!=undefined)
        //             sesso = person["SESSO"];
        //             persons.push({
        //                 name: name,
        //                 surname: surname,
        //                 sex: sesso,
        //                 creator_id:"imported",
        //                 confirmed: person["CONFERMATO"],
        //                 pay: person["PAGATO"],
        //         });
        //     }
        // });
        // console.log(persons);

        // const db = firebase.firestore();
        // const peopleRef = db.collection('people');

        // persons.forEach((person) => {
        //     //if person is not already in database with same name and surname
            
        //     peopleRef.where("name", "==", person.name).where("surname", "==", person.surname).get().then((querySnapshot) => {
        //         if(querySnapshot.size==0)
        //         {
        //             peopleRef.add({
        //                 name: person.name,
        //                 surname: person.surname,
        //                 sex: person.sex,
        //                 creator_id: person.creator_id,
        //             }).then((docRef) => {
        //                 console.log(`${person.name} ${person.surname} added to database!`);
        //             }
        //             ).catch((error) => {
        //                 alert(error);
        //             }
        //             );
        //             console.log(`${person.name} ${person.surname} not in database!`);
        //         }
        //         else
        //         {
        //             person.id = querySnapshot.docs[0].id;
        //             console.log(`${person.name} ${person.surname} already in database!`);
        //             //add guest to party xAcuoKbt8sqTitH532bj
        //             const guestsRef = db.collection('guests');
        //             guestsRef.add({
        //                 arrived: false,
        //                 confirmed: person.confirmed,
        //                 payed: person.pay,
        //                 person_id: person.id,
        //                 party_id: "xAcuoKbt8sqTitH532bj"
        //             }).then((docRef) => {
        //                 console.log(`${person.name} ${person.surname} added to party!`);
        //             }).catch((error) => {
        //                 alert(error);
        //             });
        //         }
        //     }).catch((error) => {
        //     })
        // });

            

    }, []);
    return (
        <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false, presentation: "modal"}}>
            <>
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
                <Stack.Screen name="Manage" component={ManageScreen} options={{ headerShown: false }}/>
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
                <Stack.Screen name="Analytics" component={Analytics} options={{ headerShown: false }}/>
            </>
        </Stack.Navigator>
        </NavigationContainer>
    );
}

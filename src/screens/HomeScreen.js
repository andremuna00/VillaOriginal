import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { firebase } from '../firebase/config';
import { useEffect, useState } from 'react';
import styles from './styles/global.js';
import AsyncStorage  from '@react-native-async-storage/async-storage';
export default function HomeScreen({route, navigation }) {

    //check if already logged in otherwise go to login screen using firebase
    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(false);
    const auth = firebase.auth();

    async function getUser() {
        
    }
    useEffect(() => {
        const getUser = async () => {
            let user = null;
            try
            {
                user = JSON.parse(await AsyncStorage.getItem('user'));
            }
            catch (e) {
                console.error(e);
                user=null;
            }
            
            if (user) {
                auth.signInWithEmailAndPassword(user.email, user.password).then(() => {
                    user = firebase.auth().currentUser;
                    setUser(user);
                })
            }
            else {
                const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
                return subscriber; // unsubscribe on unmount
            }
          }
        getUser();  
    }, []);

    function onAuthStateChanged(user) {
        setUser(user);
        if (!user) {
            navigation.reset({
                index: 0,
                routes: [{name: 'Login'}],
              });
        }
        else {
        //get roles of the user
        const db = firebase.firestore();
        const userRef = db.collection('users').doc(user.uid);
        userRef.get().then((doc) => {
            if (doc.exists) {
                const user = doc.data();

                if (user.roles.includes('admin'))
                    setAdmin(true);
                else
                    setAdmin(false)
            }
        });
        }
    }

    async function Logout() {
        //remove user from local storage
        await AsyncStorage.removeItem('user');
        //logout from firebase
        auth.signOut();
        navigation.reset({
            index: 0,
            routes: [{name: 'Login'}],
          });
    }

    //display four buttons for each of the four categories: party, people, manage and logout; people and manage are visible only to admin
    return (
        <View style={styles.container}>
        <Text style={styles.title}>Home Screen</Text>
            <View style={styles.verticalWrapper}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Party')}>
                    <Text style={styles.buttonTitle}>Party</Text>

                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('People')}>
                    <Text style={styles.buttonTitle}>People</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => admin?navigation.navigate('Manage'):null}>
                    <Text style={styles.buttonTitle}>Manage</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={async () => await Logout()}>
                    <Text style={styles.buttonTitle}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
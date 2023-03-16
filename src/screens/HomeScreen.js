import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { firebase } from '../firebase/config';
import { useEffect, useState } from 'react';
import styles from './styles/global.js';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import { ImageBackground } from 'react-native';
export default function HomeScreen({route, navigation }) {

    //check if already logged in otherwise go to login screen using firebase
    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(false);
    const [superadmin, setSuperAdmin] = useState(false);
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
                    const db = firebase.firestore();

                    const userRef = db.collection('UserRoles').doc(user.uid);
                    userRef.get().then((doc) => {
                        if (doc.exists) {
                            const userRoles = doc.data();
                            if (userRoles.roles.includes('superadmin'))
                            {
                                setSuperAdmin(true);
                                setAdmin(true);
                            }
                            else if (userRoles.roles.includes('admin'))
                            {
                                setSuperAdmin(false)
                                setAdmin(true);
                            }
                            else
                                setAdmin(false)
                        }
                    });
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
        const userRef = db.collection('UserRoles').doc(user.uid);
        userRef.get().then((doc) => {
            if (doc.exists) {
                const user = doc.data();
                console.log(user.roles);

                if (userRoles.roles.includes('superadmin'))
                {
                    setSuperAdmin(true);
                    setAdmin(true);
                }
                else if (userRoles.roles.includes('admin'))
                {
                    setSuperAdmin(false)
                    setAdmin(true);
                }
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
            <ImageBackground source={require('../imgs/background.png')} resizeMode="cover" style={styles.image}>
            <Text style={styles.title}>Villa Original</Text>
            <View style={styles.verticalWrapper}>
                <TouchableOpacity style={styles.button} onPress={() => admin?navigation.navigate('Party'):null}>
                    <Text style={styles.buttonTitle}>Feste</Text>

                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => admin?navigation.navigate('People'):null}>
                    <Text style={styles.buttonTitle}>Persone</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => superadmin?navigation.navigate('Manage'):null}>
                    <Text style={styles.buttonTitle}>Gestisci</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={async () => await Logout()}>
                    <Text style={styles.buttonTitle}>Logout</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
        </View>
    )
}
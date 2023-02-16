import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { firebase } from '../firebase/config';
import { useEffect, useState } from 'react';
import styles from './styles/global.js';

export default function HomeScreen({route, navigation }) {

    //check if already logged in otherwise go to login screen using firebase
    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(false);
    const auth = firebase.auth();
    
    useEffect(() => {
        const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    function onAuthStateChanged(user) {
        setUser(user);
        if (!user) {
            navigation.navigate('Login');
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

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.buttonTitle}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
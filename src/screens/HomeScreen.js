import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { firebase } from '../firebase/config';
import { useEffect, useState } from 'react';
import styles from './styles/global.js';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import { ImageBackground } from 'react-native';
import { faUser, faChampagneGlasses, faGem, faRightFromBracket, faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default function HomeScreen({route, navigation }) {

    //check if already logged in otherwise go to login screen using firebase
    const [user, setUser] = useState(null);
    const [admin, setAdmin] = useState(false);
    const [superadmin, setSuperAdmin] = useState(false);
    const [party, setParty] = useState(null);
    const auth = firebase.auth();

    // useEffect(() => {
    //     data["Lista 0909"].forEach((person) => {
    //         console.log(person["NOMI"]);
    //     });

    // }, []);

    useEffect(() => {
        const db = firebase.firestore();
        const partyRef = db.collection('party');
        const unsubscribe = partyRef.onSnapshot(querySnapshot => {
            const newParty = [];
            querySnapshot.forEach(doc => {
                const party = doc.data();
                party.id = doc.id;
                newParty.push(party);
            });
            newParty.sort((a, b) => {
                try
                {
                    const yearA = parseInt(a.date.split('/')[3]);
                    const yearB = parseInt(b.date.split('/')[3]);
                    const monthA = parseInt(a.date.split('/')[2]);
                    const monthB = parseInt(b.date.split('/')[2]);
                    const dayA = parseInt(a.date.split('/')[1]);
                    const dayB = parseInt(b.date.split('/')[1]);
                    if (yearA < yearB) {
                        return 1;
                    }
                    if (yearA > yearB) {
                        return -1;
                    }
                    if (monthA < monthB) {
                        return 1;
                    }
                    if (monthA > monthB) {
                        return -1;
                    }
                    if (dayA < dayB) {
                        return 1;
                    }
                    if (dayA > dayB) {
                        return -1;
                    }
                }
                catch(e)
                {
                    return 0;
                }
                    return 0;
            });
            setParty(newParty[0]);
        }
        );
        return unsubscribe;
    }, []);
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

    const onManagePress = (party) => {
        navigation.navigate('ManageParty', {party: party});
    }

    //display four buttons for each of the four categories: party, people, manage and logout; people and manage are visible only to admin
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../imgs/background.png')} resizeMode="cover" style={styles.image}>
            <Text style={styles.title}>Villa Original</Text>
            <View style={styles.verticalWrapper}>

                {party!=undefined && <TouchableOpacity style={styles.button} onPress={() => onManagePress(party)}>
                    <Text style={styles.listItemButtonText}>{party.name}</Text>
                    <FontAwesomeIcon style={{marginLeft: 10}} icon={faGem} size={20} color="white" />
                </TouchableOpacity> } 

                <TouchableOpacity style={styles.button} onPress={() => admin?navigation.navigate('Party'):navigation.navigate('Party')}>
                    <Text style={styles.buttonTitle}>Feste</Text>
                    <FontAwesomeIcon style={{marginLeft: 10}} icon={faChampagneGlasses} size={25} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => admin?navigation.navigate('People'):navigation.navigate('People')}>
                    <Text style={styles.buttonTitle}>Persone</Text>
                    <FontAwesomeIcon style={{marginLeft: 10}} icon={faUser} size={20} color="white" />
                </TouchableOpacity>

                
            </View>
            <View style={{flexDirection: "row"}}>
                <TouchableOpacity style={styles.button} onPress={() => superadmin?navigation.navigate('Manage'):null}>
                    <FontAwesomeIcon style={{margin: 10}} icon={faGear} size={20} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={async () => await Logout()}>
                    <FontAwesomeIcon style={{margin: 10}} icon={faRightFromBracket} size={20} color="white" />
                </TouchableOpacity>
            </View>
        </ImageBackground>
        </View>
    )
}
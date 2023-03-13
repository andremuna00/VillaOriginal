import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import CheckBox from 'expo-checkbox'
import { firebase } from '../firebase/config';
import styles from './styles/global.js';
import { ImageBackground } from 'react-native';


//before list button to add guest and select from list of people (with search bar)
//list of guest with checkboxes if payed or not, if confirmed or not, edit button, delete button
export default function ListGuestsScreen({route, navigation }) {
    const { party } = route.params;
    const [guests, setGuests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const guestsRef = firebase.firestore().collection('guests');
    
    //get list of guest and with person_id get person data with array of promises
    const onCollectionUpdate = (querySnapshot) => {
        const guests = [];
        const promises = [];
        querySnapshot.forEach((doc) => {
            const { person_id, payed, confirmed, arrived, party_id } = doc.data();
                promises.push(
                    firebase.firestore().collection('people').doc(person_id).get().then((doc_per) => {
                        const { name,surname,birthday,phone,city,instagram,notes,creator_id } = doc_per.data();
                        guests.push({
                            id: doc.id,
                            name,
                            surname,
                            birthday,
                            phone,
                            city,
                            instagram,
                            notes,
                            creator_id,
                            payed,
                            confirmed,
                            party_id,
                            arrived,
                            person_id
                        });
                    })
                );
        });
        Promise.all(promises).then(() => {
            setGuests(guests);
            setLoading(false);
        });
    }

    useEffect(() => {
        guestsRef.onSnapshot(onCollectionUpdate);
    }, []);

    return(
        <View style={styles.container}>
        <ImageBackground source={require('../imgs/background.png')} resizeMode="cover" style={styles.image}>
        
                <Text style={styles.title}>Lista degli invitati</Text>
                <TextInput
                    style={styles.inputSearch}
                    placeholder="Cerca"
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setSearch(text)}
                    value={search}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
            <ScrollView>
                <View style={styles.listContainer}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#9e9e9e" />
                    ) : (
                        
                        guests.map((guest, index) => {
                            if (guest.name.toLowerCase().includes(search.toLowerCase()) || guest.surname.toLowerCase().includes(search.toLowerCase())) {
                                return (
                                    <View style={styles.listItem} key={index}>
                                        <Text style={styles.listItemText}>{guest.name} {guest.surname}</Text>
                                            <CheckBox
                                                disabled={false}
                                                value={guest.arrived}
                                                onValueChange={(newValue) => {
                                                    guestsRef
                                                        .doc(guest.id)
                                                        .update({
                                                            arrived: newValue
                                                        })
                                                        .catch((error) => {
                                                            alert(error);
                                                        });
                                                }}
                                            />
                                        </View>
                                );
                            }
                        })

                    )}
                </View>
                </ScrollView>
                </ImageBackground>
            </View>
    );

}
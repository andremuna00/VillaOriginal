import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import CheckBox from 'expo-checkbox'
import { firebase } from '../firebase/config';
import styles from './styles/global.js';



//before list button to add guest and select from list of people (with search bar)
//list of guest with checkboxes if payed or not, if confirmed or not, edit button, delete button
export default function ManageGuestsScreen({route, navigation }) {
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

    //delete guest from database
    const onDeletePress = (guest) => {
        guestsRef
            .doc(guest.id)
            .delete()
            .then(() => {
                alert("Guest deleted!");
                setGuests(guests.filter((item) => item.id !== guest.id));
            })
            .catch((error) => {
                alert(error);
            });
    }

    //edit guest from database
    const onEditPress = (guest) => {
        navigation.navigate('EditPeople', {person: guest});
    }




    return(
        <View style={styles.container}>
        <ScrollView>
                <Text style={styles.title}>List of guests</Text>
                <TextInput
                    style={styles.inputSearch}
                    placeholder="Search"
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setSearch(text)}
                    value={search}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <View style={styles.listContainer}>
                    {loading ? (
                        <ActivityIndicator size="large" color="#9e9e9e" />
                    ) : (
                        
                        guests.map((guest, index) => {
                            if (guest.name.toLowerCase().includes(search.toLowerCase()) || guest.surname.toLowerCase().includes(search.toLowerCase())) {
                                return (
                                    <View style={styles.listItem} key={index}>
                                        <Text style={styles.listItemText}>{guest.name} {guest.surname}</Text>
                                        <View style={styles.listItemButtons}>

                                            <TouchableOpacity
                                                style={styles.listItemButton}
                                                onPress={() => onEditPress(guest)}
                                            >
                                                <Text style={styles.listItemButtonText}>Edit</Text>
                                            </TouchableOpacity>
                                            <CheckBox
                                                disabled={false}
                                                value={guest.confirmed}
                                                onValueChange={(newValue) => {
                                                    guestsRef
                                                        .doc(guest.id)
                                                        .update({
                                                            confirmed: newValue
                                                        })
                                                        .catch((error) => {
                                                            alert(error);
                                                        });
                                                }}
                                            />
                                            <CheckBox
                                                disabled={false}
                                                value={guest.payed}
                                                onValueChange={(newValue) => {
                                                    guestsRef
                                                        .doc(guest.id)
                                                        .update({
                                                            payed: newValue
                                                        })
                                                        .catch((error) => {
                                                            alert(error);
                                                        });
                                                }}
                                            />
                                            <TouchableOpacity
                                                style={styles.listItemButton}
                                                onPress={() => onDeletePress(guest)}
                                            >
                                                <Text style={styles.listItemButtonText}>Delete</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                );
                            }
                        })

                    )}
                </View>
                <TouchableOpacity

                    style={styles.button}
                    onPress={() => navigation.navigate('AddGuests', {party: party, guests: guests})}
                >
                    <Text style={styles.buttonTitle}>Add guest</Text>
                </TouchableOpacity>
                </ScrollView>
            </View>
    );

}
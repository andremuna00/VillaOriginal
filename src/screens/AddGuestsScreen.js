
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { firebase } from '../firebase/config';
import styles from './styles/global.js';
import { ImageBackground } from 'react-native';


//display list of all people to database showing name, surname, birthday year, instagram link, edit button, delete button
export default function AddGuestScreen({route, navigation }){

    //get all people from database
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const peopleRef = firebase.firestore().collection('people');
    const onCollectionUpdate = (querySnapshot) => {
        const people = [];
        querySnapshot.forEach((doc) => {
            const { name,surname,birthday,phone,city,instagram,notes,creator_id } = doc.data();
            //check that person is not already added to event
            if(route.params.guests.filter(guest => guest.person_id === doc.id).length==0){
                people.push({
                    id: doc.id,
                    name,
                    surname,
                    birthday,
                    phone,
                    city,
                    instagram,
                    notes,
                    creator_id
                });
            }
        });
        setPeople(people);
        setLoading(false);
    }

    useEffect(() => {
        peopleRef.onSnapshot(onCollectionUpdate);
    }, []);


    const onAddPress = (person) => {
        const guestsRef = firebase.firestore().collection('guests');
        //prevent adding person to event if already added
        guestsRef.where("person_id", "==", person.id).where("party_id", "==", route.params.party.id).get().then((querySnapshot) => {
            if (querySnapshot.size > 0) {
                alert("Person already added to event!");
            } else {
                guestsRef.add({
                    person_id: person.id,
                    payed: false,
                    confirmed: false,
                    arrived: false,
                    party_id: route.params.party.id
                }).then((docRef) => {
                    alert("Guest added!");
                }
                ).catch((error) => {
                    alert(error);
                }
                );
        
                //navigation.navigate('ListGuests', {party: route.params.party});
            }
        });

        
    }

    return(
        <View style={styles.container}>
            <ImageBackground source={require('../imgs/background.png')} resizeMode="cover" style={styles.image}>
                <Text style={styles.title}>Aggiungi in lista</Text>
                <TextInput
                    style={styles.inputSearch}
                    placeholder='Cerca'
                    placeholderTextColor="#aaaaaa"
                    onChangeText={(text) => setSearch(text)}
                    value={search}
                    underlineColorAndroid="transparent"
                    autoCapitalize="none"
                />
                <ScrollView>
                    {
                        people.length == 0 && !loading && people.filter((person) => person.name.toLowerCase().includes(search.toLowerCase())||person.surname.toLowerCase().includes(search.toLowerCase())).length == 0 && (
                            <View style={styles.listItemContainer}>
                                <Text style={styles.listItem}>No persone trovate</Text>
                            </View>
                        )
                    }
                    {   
                        people.map((person, index) => {
                        return (

                            (person.name.toLowerCase().includes(search.toLowerCase())||person.surname.toLowerCase().includes(search.toLowerCase())) &&
                            <View style={styles.listItemView} key={person.id}>
                                <Text style={styles.listItemTitle}>{person.name} {person.surname}</Text>
                                <TouchableOpacity
                                    style={styles.button}
                                    onPress={() => onAddPress(person)}>
                                    <Text style={styles.buttonTitle}>Aggiungi</Text>
                                </TouchableOpacity>
                            </View>
                        )

                    })}
                </ScrollView>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('EditPeople', {person: null, onAddPress: onAddPress, goBack: "AddGuests"})}
                >
                    <Text style={styles.buttonTitle}>Aggiungi nuova persona</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    )
}
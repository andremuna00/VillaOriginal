import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList, ActivityIndicator, Linking } from 'react-native';
import CheckBox from 'expo-checkbox'
import { firebase } from '../firebase/config';
import styles from './styles/global.js';
import { ImageBackground } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash, faEdit, faPersonBooth } from '@fortawesome/free-solid-svg-icons';
import {faInstagram} from '@fortawesome/free-brands-svg-icons';

//before list button to add guest and select from list of people (with search bar)
//list of guest with checkboxes if payed or not, if confirmed or not, edit button, delete button
export default function ManageGuestsScreen({route, navigation }) {
    const { party } = route.params;
    const [guests, setGuests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const guestsRef = firebase.firestore().collection('guests');
    
    const handlePress = async (url) => {
        // Checking if the link is supported for links with custom URL scheme.
        const supported = await Linking.canOpenURL(url);
    
        if (supported) {
          // Opening the link with some app, if the URL scheme is "http" the web link should be opened
          // by some browser in the mobile
          await Linking.openURL(url);
        } else {
          Alert.alert(`Don't know how to open this URL: ${url}`);
        }
      };

    //get list of guest and with person_id get person data with array of promises
    const onCollectionUpdate = (querySnapshot) => {
        const guests = [];
        const promises = [];
        querySnapshot.forEach((doc) => {
            const { person_id, payed, confirmed, arrived, party_id } = doc.data();
                promises.push(
                    firebase.firestore().collection('people').doc(person_id).get().then((doc_per) => {
                        if(doc_per.exists)
                        {
                            const { name,surname,birthday,phone,sex,instagram,notes,creator_id } = doc_per.data();
                            guests.push({
                                id: doc.id,
                                name,
                                surname,
                                birthday,
                                phone,
                                sex,
                                instagram,
                                notes,
                                creator_id,
                                payed,
                                confirmed,
                                party_id,
                                arrived,
                                person_id
                            });
                    }
                })
                    
                );
        });
        Promise.all(promises).then(() => {
            setGuests(guests);
            setLoading(false);
        });
    }




    useEffect(() => {
        guestsRef.where("party_id", "==", party.id).onSnapshot(onCollectionUpdate);
    }, []);

    //delete guest from database
    const onDeletePress = (guest) => {
        guestsRef
            .doc(guest.id)
            .delete()
            .then(() => {
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

    const onInstagramPress = (guest) => {
        navigation.navigate('Instagram', {person: guest});
    }

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
                                    <View style={styles.listItemContainer} key={index}>
                                        <View style={styles.listItemView}>
                                            <Text style={styles.listItemTitle}>{guest.name} {guest.surname}</Text>

                                            {guest.instagram!=null && guest.instagram!="" &&<TouchableOpacity onPress={()=> handlePress(guest.instagram)} style={styles.listItem} >
                                                <FontAwesomeIcon icon={ faInstagram } size={ 20 } color="#fff" />
                                            </TouchableOpacity>}
                                            {/*<TouchableOpacity style={styles.listItem} onPress={() =>{
                                                guest.id = guest.person_id;
                                                onEditPress(guest)}}>
                                                <FontAwesomeIcon icon={ faEdit } size={ 20 } color="#fff" />
                                            </TouchableOpacity>*/}
                                            <TouchableOpacity style={styles.listItem} onPress={() => onDeletePress(guest)}>
                                                <FontAwesomeIcon icon={ faTrash } size={ 20 } color="#b20c" />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={styles.listItemView}>
                                            <CheckBox
                                                disabled={false}
                                                style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }], margin: 10 }}
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
                                            <Text style={styles.secondaryText}>CONFERMATO</Text>
                                        </View>
                                        <View style={styles.listItemView}>
                                            <CheckBox
                                                disabled={false}
                                                style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }], margin: 10 }}
                                                className="checkbox"
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
                                            <Text style={styles.secondaryText}>PAGATO</Text>
                                        </View>
                                        <View style={styles.hr}></View>

                                    </View>
                                );
                            }
                        })

                    )}
                </View>
            </ScrollView>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('AddGuests', {party: party, guests: guests})}
            >
                <Text style={styles.buttonTitle}>Aggiungi invitato</Text>
                <FontAwesomeIcon style={{marginLeft: 10}} icon={faPersonBooth} size={20} color="#ffffff" />
            </TouchableOpacity>
            </ImageBackground>
        </View>
    );

}
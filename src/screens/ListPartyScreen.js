
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert  } from 'react-native';
import { firebase } from '../firebase/config';
import styles from './styles/global.js';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ImageBackground } from 'react-native';


export default function ListPartyScreen({route, navigation }){

    //get all people from database
    const [party, setParty] = useState([]);
    const [loading, setLoading] = useState(true);

    const partyRef = firebase.firestore().collection('party');
    const onCollectionUpdate = (querySnapshot) => {
        const party = [];
        querySnapshot.forEach((doc) => {
            const { name, date,notes, creator_id,price } = doc.data();
            party.push({
                id: doc.id,
                name,
                date,
                notes,
                price,
                creator_id
            });
            party.sort(function(a, b) {
                return new Date(b.date) - new Date(a.date);
            });

        });
        setParty(party);
        setLoading(false);
    }

    useEffect(() => {
        const unsubscribe = partyRef.onSnapshot(onCollectionUpdate);
        return () => unsubscribe();
    }, []);

    const showConfirmDialog = (message,party) => {
        Alert.alert(
            "Conferma",
            message,
            [
                {
                    text: "Annulla",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => onDeletePress(party) }
            ],
            { cancelable: false }
        );
      };

    //delete party from database
    const onDeletePress = (party) => {

        partyRef
            .doc(party.id)
            .delete()
            .then(() => {
            })
            .catch((error) => {
                alert(error);
            });
        
        //delete all guest from the lists with party_id of this party
        const guestRef = firebase.firestore().collection('guest');
        guestRef
            .where("party_id", "==", party.id)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.ref.delete();
                });
            }
        );

        //delete all item from the shopping_list with party_id of this party
        const shoppingListRef = firebase.firestore().collection('shopping_list');
        shoppingListRef
            .where("party_id", "==", party.id)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.ref.delete();
                });
            }
        );

    }

    //edit party from database
    const onEditPress = (party) => {
        navigation.navigate('EditParty', {party: party});
    }

    //edit party from database
    const onManagePress = (party) => {
        navigation.navigate('ManageParty', {party: party});
    }

    return(
        <View style={styles.container}>
        <ImageBackground source={require('../imgs/background.png')} resizeMode="cover" style={styles.image}>
            <Text style={styles.title}>Lista delle feste</Text>
            {loading ? <Text>Caricamento...</Text> : (
                <ScrollView>
                    {party.map((party, index) => {
                        return (
                            <View key={index} style={styles.listItemContainer}>
                                <View style={styles.listItemView}>
                                    <Text style={styles.listItemTitle}>{party.name}</Text>
                                    <TouchableOpacity style={styles.listItem} onPress={() => onEditPress(party)}>
                                        <FontAwesomeIcon icon={ faEdit } size={ 20 } color="#fff" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.listItem} onPress={() => showConfirmDialog("Sicuro di voler cancellare la festa?", party)}>
                                        <FontAwesomeIcon icon={ faTrash } size={ 20 } color="#b20c" />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.listItemView}>
                                    <Text style={styles.listItem}>{party.date}</Text>
                                    <Text style={styles.listItem}>{party.price}€</Text>
                                    <TouchableOpacity style={styles.listItemButton} onPress={() => onManagePress(party)}>
                                        <Text style={styles.listItemButtonText}>Organizza</Text>
                                    </TouchableOpacity>       
                                </View>                    
                            </View>
                        )
                    })}
                    </ScrollView>
            )}
            </ImageBackground>
        </View>
    )
}
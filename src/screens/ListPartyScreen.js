
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { firebase } from '../firebase/config';
import styles from './styles/global.js';

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



    //delete party from database
    const onDeletePress = (party) => {
        partyRef
            .doc(party.id)
            .delete()
            .then(() => {
                alert("party deleted!");
            })
            .catch((error) => {
                alert(error);
            });
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
            <Text style={styles.title}>List of people</Text>
            {loading ? <Text>Loading...</Text> : (
                <ScrollView>
                    {party.map((party, index) => {
                        return (
                            <View key={index} style={styles.listItemContainer}>
                                <Text style={styles.listItem}>{party.name} {party.surname}</Text>
                                <TouchableOpacity style={styles.button} onPress={() => onEditPress(party)}>
                                    <Text style={styles.buttonTitle}>Edit</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() => onManagePress(party)}>
                                    <Text style={styles.buttonTitle}>Manage</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.button} onPress={() => onDeletePress(party)}>
                                    <Text style={styles.buttonTitle}>Delete</Text>
                                </TouchableOpacity>
                            </View>

                        )
                    })}
                    </ScrollView>
            )}
        </View>
    )
}
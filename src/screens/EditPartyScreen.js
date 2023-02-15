
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { firebase } from '../firebase/config';
import styles from './styles/global.js';


//page for adding a new party is no one is passed to route to the database to table persone: name, date, notes
export default function EditPartyScreen({route, navigation }) {
    const party = route.params? route.params.party:null;
    const [name, setName] = useState(party ? party.name : '');
    const [date, setDate] = useState(party ? party.date : '');
    const [notes, setNotes] = useState(party ? party.notes : '');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);



    const onEditPress = () => {
        setLoading(true);
        firebase
            .firestore()
            .collection('party')
            .doc(party.id)
            .update({
                name: name,
                date: date,
                notes: notes,
                creator_id: party.creator_id
            })
            .then(() => {
                setLoading(false);
                navigation.navigate('ListParty');
            })
            .catch(error => {
                setLoading(false);
                setError(error.message);
            })
    };

    const onAddPress = () => {
        setLoading(true);
        firebase
            .firestore()
            .collection('party')
            .add({
                name: name,
                date: date,
                notes: notes,
                creator_id: firebase.auth().currentUser.uid
            })
            .then(() => {
                setLoading(false);
                navigation.navigate('Party');
            })
            .catch(error => {
                setLoading(false);
                setError(error.message);
            })
    };

    return (
        <View style={styles.container}>
            <Text style={styles.greeting}>{`Hello again. \nWelcome back.`}</Text>

            <View style={styles.errorMessage}>
                {error ? <Text style={styles.error}>{error}</Text> : null}
            </View>

            <View style={styles.form}>
                <View>
                    <Text style={styles.inputTitle}>Name</Text>
                    <TextInput style={styles.input} autoCapitalize="none" onChangeText={name => setName(name)} value={name}></TextInput>

                    <Text style={styles.inputTitle}>Date</Text>
                    <TextInput style={styles.input} autoCapitalize="none" onChangeText={date => setDate(date)} value={date}></TextInput>

                    <Text style={styles.inputTitle}>Notes</Text>
                    <TextInput style={styles.input} autoCapitalize="none" onChangeText={notes => setNotes(notes)} value={notes}></TextInput>

                </View>

            </View>

            <TouchableOpacity style={styles.button} onPress={party ? onEditPress : onAddPress}>
                <Text style={{ color: "#FFF", fontWeight: "500" }}>{party ? "Edit" : "Add"}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ alignSelf: "center", marginTop: 32 }} onPress={() => navigation.navigate(party ? 'ListParty':'Party')}>
                <Text style={{ color: "#414959", fontSize: 13 }}>
                    Go back to party
                </Text>
            </TouchableOpacity>
        </View>
    )

}
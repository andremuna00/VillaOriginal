
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { firebase } from '../firebase/config';
import styles from './styles/global.js';
import { ImageBackground } from 'react-native';


//page for adding a new person is no one is passed to route to the database to table persone: name, surname, birthday year, phone, city, instagram link, notes, creator_id
export default function EditPeopleScreen({route, navigation }) {
    const person = route.params? route.params.person:null;
    const [name, setName] = useState(person ? person.name : '');
    const [surname, setSurname] = useState(person ? person.surname : '');
    const [birthday, setBirthday] = useState(person ? person.birthday : '');
    const [phone, setPhone] = useState(person ? person.phone : '');
    const [city, setCity] = useState(person ? person.city : '');
    const [instagram, setInstagram] = useState(person ? person.instagram : '');
    const [notes, setNotes] = useState(person ? person.notes : '');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const onEditPress = () => {
        setLoading(true);
        firebase
            .firestore()
            .collection('people')
            .doc(person.id)
            .update({
                name: name,
                surname: surname,
                birthday: birthday,
                phone: phone,
                city: city,
                instagram: instagram,
                notes: notes,
                creator_id: person.creator_id
            })
            .then(() => {
                setLoading(false);
                navigation.navigate('ListPeople');
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
            .collection('people')
            .add({
                name: name,
                surname: surname,
                birthday: birthday,
                phone: phone,
                city: city,
                instagram: instagram,
                notes: notes,
                creator_id: firebase.auth().currentUser.uid
            })
            .then(() => {
                setLoading(false);
                navigation.navigate('People');
            })
            .catch(error => {
                setLoading(false);
                setError(error.message);
            })
    };

    return (
        <View style={styles.container}>
        <ImageBackground source={require('../imgs/background.png')} resizeMode="cover" style={styles.image}>
        <Text style={styles.editTitle}>{person ? "Modifica dati persona" : "Aggiungi nuova persona"}</Text>
            <View>
                <View>
                    <Text style={styles.inputTitle}>Nome</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        onChangeText={name => setName(name)}
                        value={name}
                    ></TextInput>
                </View>

                <View>
                    <Text style={styles.inputTitle}>Cognome</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        onChangeText={surname => setSurname(surname)}
                        value={surname}
                    ></TextInput>
                </View>

                <View>
                    <Text style={styles.inputTitle}>Data di Nascita</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        onChangeText={birthday => setBirthday(birthday)}
                        value={birthday}
                    ></TextInput>
                </View>

                <View>
                    <Text style={styles.inputTitle}>Cellulare</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        onChangeText={phone => setPhone(phone)}
                        value={phone}
                    ></TextInput>
                </View>

                <View>
                    <Text style={styles.inputTitle}>Instagram</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        onChangeText={instagram => setInstagram(instagram)}
                        value={instagram}
                    ></TextInput>
                </View>

                <View>
                    <Text style={styles.inputTitle}>Note</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        onChangeText={notes => setNotes(notes)}
                        value={notes}
                    ></TextInput>
                </View>

            </View>

            <TouchableOpacity style={styles.button} onPress={person ? onEditPress : onAddPress}>
                <Text style={{ color: "#FFF", fontWeight: "500" }}>{person ? "Salva" : "Aggiungi"}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ alignSelf: "center", marginTop: 32 }} onPress={() => navigation.goBack()}>
                <Text style={styles.goBack}>
                    {"< Torna indietro"}
                </Text>
            </TouchableOpacity>
            </ImageBackground>
        </View>
    )

}

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { firebase } from '../firebase/config';
import styles from './styles/global.js';
import { ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';
//page for adding a new person is no one is passed to route to the database to table persone: name, surname, birthday year, phone, sex, instagram link, notes, creator_id
export default function EditPeopleScreen({route, navigation }) {
    const person = route.params? route.params.person:null;
    const [name, setName] = useState(person ? person.name : '');
    const [surname, setSurname] = useState(person ? person.surname : '');
    const [birthday, setBirthday] = useState(person ? person.birthday : '');
    const [phone, setPhone] = useState(person ? person.phone : '');
    const [sex, setSex] = useState(person ? person.sex : '');
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
                birthday: birthday==undefined?null:birthday,
                phone: phone==undefined?null:phone,
                sex: sex==undefined?null:sex,
                instagram: instagram==undefined?null:instagram,
                notes: notes==undefined?null:notes,
                creator_id: person.creator_id
            })
            .then(() => {
                setLoading(false);
                navigation.goBack();
            })
            .catch(error => {
                console.error(error);
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
                sex: sex,
                instagram: instagram,
                notes: notes,
                creator_id: firebase.auth().currentUser.uid
            })
            .then(() => {
                setLoading(false);
                navigation.goBack();
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
            <ScrollView>
            <View style={styles.form}>
                <View>
                    <Text style={styles.inputTitle}>Nome</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="sentences"
                        onChangeText={name => setName(name)}
                        value={name}
                    ></TextInput>
                </View>

                <View>
                    <Text style={styles.inputTitle}>Cognome</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="sentences"
                        onChangeText={surname => setSurname(surname)}
                        value={surname}
                    ></TextInput>
                </View>

                <View>
                    <Text style={styles.inputTitle}>Anno di Nascita</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="sentences"
                        keyboardType='numeric'
                        onChangeText={birthday => setBirthday(birthday)}
                        value={birthday}
                    ></TextInput>
                </View>

                <View>
                    <Text style={styles.inputTitle}>Sesso</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="sentences"
                        onChangeText={sex => setSex(sex)}
                        value={sex}
                    ></TextInput>
                </View>
{/*
                <View>
                    <Text style={styles.inputTitle}>Cellulare</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="sentences"
                        keyboardType='numeric'
                        onChangeText={phone => setPhone(phone)}
                        value={phone}
                    ></TextInput>
                </View>

                <View>
                    <Text style={styles.inputTitle}>Instagram</Text>
                    <TextInput
                        style={styles.input}
                        keyboardType='url'
                        autoCapitalize="sentences"
                        onChangeText={instagram => setInstagram(instagram)}
                        value={instagram}
                    ></TextInput>
                </View>

                <View>
                    <Text style={styles.inputTitle}>Note</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="sentences"
                        onChangeText={notes => setNotes(notes)}
                        value={notes}
                    ></TextInput>
                </View>
                */ }
            </View>

            <TouchableOpacity style={styles.button} onPress={person ? onEditPress : onAddPress}>
                <Text style={{ color: "#FFF", fontWeight: "500" }}>{person ? "Salva" : "Aggiungi"}</Text>
                <FontAwesomeIcon icon={faSave} size={20} color="#FFF" style={{ marginLeft: 10 }} />
            </TouchableOpacity>

            <TouchableOpacity style={{ alignSelf: "center", marginTop: 32 }} onPress={() => navigation.goBack()}>
                <Text style={styles.goBack}>
                    {"< Torna indietro"}
                </Text>
            </TouchableOpacity>
            </ScrollView>
            </ImageBackground>
        </View>
    )

}
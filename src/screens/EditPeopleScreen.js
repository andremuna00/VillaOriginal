
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { firebase } from '../firebase/config';
import styles from './styles/global.js';


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
            <Text style={styles.greeting}>{`Hello again. \nWelcome back.`}</Text>

            <View style={styles.errorMessage}>
                {error ? <Text style={styles.error}>{error}</Text> : null}
            </View>

            <View style={styles.form}>
                <View>
                    <Text style={styles.inputTitle}>Name</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        onChangeText={name => setName(name)}
                        value={name}
                    ></TextInput>
                </View>

                <View style={{ marginTop: 32 }}>
                    <Text style={styles.inputTitle}>Surname</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        onChangeText={surname => setSurname(surname)}
                        value={surname}
                    ></TextInput>
                </View>

                <View style={{ marginTop: 32 }}>
                    <Text style={styles.inputTitle}>Birthday</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        onChangeText={birthday => setBirthday(birthday)}
                        value={birthday}
                    ></TextInput>
                </View>

                <View style={{ marginTop: 32 }}>
                    <Text style={styles.inputTitle}>Phone</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        onChangeText={phone => setPhone(phone)}
                        value={phone}
                    ></TextInput>
                </View>

                <View style={{ marginTop: 32 }}>
                    <Text style={styles.inputTitle}>City</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        onChangeText={city => setCity(city)}
                        value={city}
                    ></TextInput>

                </View>

                <View style={{ marginTop: 32 }}>
                    <Text style={styles.inputTitle}>Instagram</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        onChangeText={instagram => setInstagram(instagram)}
                        value={instagram}
                    ></TextInput>
                </View>

                <View style={{ marginTop: 32 }}>
                    <Text style={styles.inputTitle}>Notes</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        onChangeText={notes => setNotes(notes)}
                        value={notes}
                    ></TextInput>
                </View>

            </View>

            <TouchableOpacity style={styles.button} onPress={person ? onEditPress : onAddPress}>
                <Text style={{ color: "#FFF", fontWeight: "500" }}>{person ? "Edit" : "Add"}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ alignSelf: "center", marginTop: 32 }} onPress={() => navigation.navigate(person ? 'ListPeople':'People')}>
                <Text style={{ color: "#414959", fontSize: 13 }}>
                    Go back to people
                </Text>
            </TouchableOpacity>
        </View>
    )

}
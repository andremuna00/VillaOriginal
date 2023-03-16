
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { firebase } from '../firebase/config';
import styles from './styles/global.js';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ImageBackground } from 'react-native';

//display list of all people to database showing name, surname, birthday year, instagram link, edit button, delete button
export default function ListPeopleScreen({route, navigation }){

    //get all people from database
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const peopleRef = firebase.firestore().collection('people');
    const onCollectionUpdate = (querySnapshot) => {
        const people = [];
        querySnapshot.forEach((doc) => {
            const { name,surname,birthday,phone,sex,instagram,notes,creator_id } = doc.data();
            people.push({
                id: doc.id,
                name,
                surname,
                birthday,
                phone,
                sex,
                instagram,
                notes,
                creator_id
            });
        });
        setPeople(people);
        setLoading(false);
    }

    useEffect(() => {
        peopleRef.onSnapshot(onCollectionUpdate);
    }, []);

    const showConfirmDialog = (message,people) => {
        Alert.alert(
            "Conferma",
            message,
            [
                {
                    text: "Annulla",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => onDeletePress(people) }
            ],
            { cancelable: false }
        );
      };

    //delete person from database
    const onDeletePress = (person) => {
        peopleRef
            .doc(person.id)
            .delete()
            .then(() => {
            })
            .catch((error) => {
                alert(error);
            });

        //delete from guest
        const guestRef = firebase.firestore().collection('guest');
        guestRef
            .where("person_id", "==", person.id)
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.ref.delete();
                });
            }
        );

    }

    //edit person from database
    const onEditPress = (person) => {
        navigation.navigate('EditPeople', {person: person});
    }

    return(
        <View style={styles.container}>
        <ImageBackground source={require('../imgs/background.png')} resizeMode="cover" style={styles.image}>
                <Text style={styles.title}>Lista delle persone</Text>
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
                    {people.map((person, index) => {
                        return (
                            (person.name.toLowerCase().includes(search.toLowerCase())||person.surname.toLowerCase().includes(search.toLowerCase())) &&
                            <View style={styles.listItemContainer} key={person.id}>                    
                                <View style={styles.listItemView}>
                                    <Text style={styles.listItemTitle}>{person.name} {person.surname}</Text>
                                    <TouchableOpacity style={styles.listItem} onPress={() => onEditPress(person)}>
                                        <FontAwesomeIcon icon={ faEdit } size={ 25 } color="#fff" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.listItem} onPress={() => showConfirmDialog("Sei sicuro di voler cancellare questa persona?", person)}>
                                        <FontAwesomeIcon icon={ faTrash } size={ 25 } color="#f00" />
                                    </TouchableOpacity>
                                </View>

                                </View>
                        )
                    })}
                </ScrollView>
        </ImageBackground>
        </View>
    )
}
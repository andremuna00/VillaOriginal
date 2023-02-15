
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { firebase } from '../firebase/config';
import styles from './styles/global.js';


//display list of all people to database showing name, surname, birthday year, instagram link, edit button, delete button
export default function ListPeopleScreen({route, navigation }){

    //get all people from database
    const [people, setPeople] = useState([]);
    const [loading, setLoading] = useState(true);

    const peopleRef = firebase.firestore().collection('people');
    const onCollectionUpdate = (querySnapshot) => {
        const people = [];
        querySnapshot.forEach((doc) => {
            const { name,surname,birthday,phone,city,instagram,notes,creator_id } = doc.data();
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
        });
        setPeople(people);
        setLoading(false);
    }

    useEffect(() => {
        peopleRef.onSnapshot(onCollectionUpdate);
    }, []);

    //delete person from database
    const onDeletePress = (person) => {
        peopleRef
            .doc(person.id)
            .delete()
            .then(() => {
                alert("Person deleted!");
            })
            .catch((error) => {
                alert(error);
            });
    }

    //edit person from database
    const onEditPress = (person) => {
        navigation.navigate('EditPeople', {person: person});
    }

    return(
        <View style={styles.container}>
            <View style={styles.verticalWrapper}>
                <Text style={styles.title}>List of people</Text>
                {loading ? <Text>Loading...</Text> : (
                    <ScrollView>
                        {people.map((person, index) => {
                            return (
                                <View key={index} style={styles.horizontalWrapper}>
                                    <Text style={styles.text}>{person.name} {person.surname} {person.birthday} {person.instagram}</Text>
                                    <TouchableOpacity style={styles.button} onPress={() => onEditPress(person)}>

                                        <Text style={styles.buttonTitle}>Edit</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.button} onPress={() => onDeletePress(person)}>
                                        <Text style={styles.buttonTitle}>Delete</Text>
                                    </TouchableOpacity>
                                    </View>
                            )
                        })}
                        </ScrollView>
                )}
                </View>
        </View>
    )
}
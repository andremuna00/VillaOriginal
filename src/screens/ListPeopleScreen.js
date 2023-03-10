
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
                            <View style={styles.listItemContainer} key={person.index}>                    
                                <View style={styles.listItemView}>
                                    <Text style={styles.listItemTitle}>{person.name} {person.surname}</Text>
                                    <TouchableOpacity style={styles.listItem} onPress={() => onEditPress(person)}>
                                        <FontAwesomeIcon icon={ faEdit } size={ 25 } color="#fff" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.listItem} onPress={() => onDeletePress(person)}>
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
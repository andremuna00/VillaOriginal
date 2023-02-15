
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { firebase } from '../firebase/config';
import styles from './styles/global.js';


//page for adding a new item is no one is passed to route to the database to table items: name, price, mark, notes
export default function EditItemsShoppingScreen({route, navigation }) {
    const items = route.params? route.params.items:null;
    const [name, setName] = useState(items ? items.name : '');
    const [price, setPrice] = useState(items ? items.price : '');
    const [mark, setMark] = useState(items ? items.mark : '');
    const [notes, setNotes] = useState(items ? items.notes : '');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const onEditPress = () => {
        setLoading(true);
        firebase
            .firestore()
            .collection('items')
            .doc(items.id)
            .update({
                name: name,
                price: price,
                mark: mark,
                notes: notes,
                creator_id: items.creator_id
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
            .collection('items')
            .add({
                name: name,
                price: price,
                mark: mark,
                notes: notes,
                creator_id: firebase.auth().currentUser.uid
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

                    <Text style={styles.inputTitle}>Price</Text>
                    <TextInput style={styles.input} autoCapitalize="none" onChangeText={price => setPrice(price)} value={price}></TextInput>

                    <Text style={styles.inputTitle}>Mark</Text>
                    <TextInput style={styles.input} autoCapitalize="none" onChangeText={mark => setMark(mark)} value={mark}></TextInput>
                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={items ? onEditPress : onAddPress}>
                <Text style={{ color: "#FFF", fontWeight: "500" }}>{items ? "Edit" : "Add"}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={{ alignSelf: "center", marginTop: 32 }} onPress={() => navigation.navigate(items ? 'ListParty':'Party')}>
                <Text style={{ color: "#414959", fontSize: 13 }}>
                    Go back to party
                </Text>
            </TouchableOpacity>
        </View>
    )

}
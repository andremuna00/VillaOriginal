
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity,KeyboardAvoidingView } from 'react-native';
import { firebase } from '../firebase/config';
import styles from './styles/global.js';
import { ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';


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
                navigation.goBack();
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
        
                <Text style={styles.editTitle}>{items ? "Modifica dati prodotto" : "Aggiungi nuovo prodotto"}</Text>

                <View style={styles.errorMessage}>
                    {error ? <Text style={styles.error}>{error}</Text> : null}
                </View>
                <ScrollView>
                    <View style={styles.form}>
                        <View>
                            <Text style={styles.inputTitle}>Nome</Text>
                            <TextInput style={styles.input} autoCapitalize="none" onChangeText={name => setName(name)} value={name}></TextInput>

                            <Text style={styles.inputTitle}>Prezzo</Text>
                            <TextInput style={styles.input} keyboardType="numeric" autoCapitalize="none" onChangeText={price => setPrice(price)} value={price}></TextInput>

                            <Text style={styles.inputTitle}>Marca/Negozio</Text>
                            <TextInput style={styles.input} autoCapitalize="none" onChangeText={mark => setMark(mark)} value={mark}></TextInput>
                        </View>
                    </View>
                    
                    <TouchableOpacity style={styles.button} onPress={items ? onEditPress : onAddPress}>
                        <Text style={{ color: "#FFF", fontWeight: "500" }}>{items ? "Salva" : "Aggiungi"}</Text>
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
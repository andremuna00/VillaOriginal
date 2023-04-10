
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { firebase } from '../firebase/config';
import styles from './styles/global.js';
import { ImageBackground } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus, faShoppingBasket } from '@fortawesome/free-solid-svg-icons';


//display list of all people to database showing name, surname, birthday year, instagram link, edit button, delete button
export default function AddShoppingItemScreen({route, navigation }){

    //get all people from database
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const peopleRef = firebase.firestore().collection('items');

    const onCollectionUpdate = (querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
            const { name,price,mark,notes,creator_id } = doc.data();
            if(route.params.shoppingList.filter(item => item.item_id === doc.id).length==0){
                items.push({
                    id: doc.id,
                    name,
                    price,
                    mark,
                    notes,
                    creator_id
                });
            }
        });
        setItems(items);
        setLoading(false);
    }

    useEffect(() => {
        peopleRef.onSnapshot(onCollectionUpdate);
    }, []);
        
    //add item to ShoppingList
    const onAddPress = (item) => {
        const shoppingListRef = firebase.firestore().collection('shopping_list');
        shoppingListRef.add(
            {
                item_id: item.id,
                bought: false,
                quantity: 1,
                party_id: route.params.party.id
            }
        ).then((docRef) => {
            setItems(items.filter((i) => i.id !== item.id));
        }
        ).catch((error) => {
            alert(error);
        }       
        )
    }


    return(
        <View style={styles.container}>
        <ImageBackground source={require('../imgs/background.png')} resizeMode="cover" style={styles.image}>
            <Text style={styles.title}>Aggiungi alla lista della spesa</Text>
            <TextInput
                style={styles.input}
                placeholder='Cerca'
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setSearch(text)}
                value={search}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
            <ScrollView>
                {
                    items.length == 0 && !loading && items.filter((item) => item.name.toLowerCase().includes(search.toLowerCase())||item.surname.toLowerCase().includes(search.toLowerCase())).length == 0 && (
                            <View style={styles.listItemContainer}>
                                <Text style={styles.listItem}>No prodotti trovati</Text>
                            </View>
                    )
                }
                {items.map((item) => {
                    return (
                        (item.name.toLowerCase().includes(search.toLowerCase())||item.surname.toLowerCase().includes(search.toLowerCase())) &&
                        <View style={styles.listItemView} key={item.id}>
                            <Text style={styles.secondaryText}>{item.name} - {item.price}€</Text>
                            <TouchableOpacity
                                style={{backgroundColor: "#000000", borderRadius: 20, padding: 10, margin : 10}}
                                onPress={() => onAddPress(item)}>
                                <FontAwesomeIcon icon={ faPlus } size={ 20 } color="#ffffff" />
                            </TouchableOpacity>

                        </View>
                    )
                }
                )}
            </ScrollView>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('EditItemsShopping', {item: null, onAddPress: onAddPress, goBack: "AddShoppingItem"})}
            >
                <Text style={styles.buttonTitle}>Crea nuovo prodotto</Text>
                <FontAwesomeIcon style={{marginLeft: 10}} icon={faShoppingBasket} size={20} color="#ffffff" />
            </TouchableOpacity>
            </ImageBackground>
        </View>

    )
}
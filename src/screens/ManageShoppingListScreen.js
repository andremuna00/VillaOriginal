import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import CheckBox from 'expo-checkbox'
import { firebase } from '../firebase/config';
import styles from './styles/global.js';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ImageBackground } from 'react-native';

//before list button to add guest and select from list of people (with search bar)
//list of guest with checkboxes if payed or not, if confirmed or not, edit button, delete button
export default function ManageShoppingListScreen({route, navigation }) {
    const { party } = route.params;
    const [shoppingList, setShoppingList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    const shoppingListRef = firebase.firestore().collection('shopping_list');
    
    //get list of guest and with person_id get person data with array of promises
    const onCollectionUpdate = (querySnapshot) => {
        const shoppingList = [];
        const promises = [];
        querySnapshot.forEach((doc) => {
            const { item_id, bought, party_id } = doc.data();
                promises.push(
                    firebase.firestore().collection('items').doc(item_id).get().then((doc_per) => {
                        const { name,price,notes,creator_id,mark } = doc_per.data();
                        shoppingList.push({
                            id: doc.id,
                            name,
                            price,
                            notes,
                            creator_id,
                            mark,
                            bought,
                            party_id,
                            item_id
                        });
                    }
                ));
        });
        Promise.all(promises).then(() => {
            setShoppingList(shoppingList);
            setLoading(false);
        });
    }

    useEffect(() => {
        shoppingListRef.where("party_id", "==", party.id).onSnapshot(onCollectionUpdate);

    }, []);

    //delete listitem from database
    function onDeletePress(listItem) {
        shoppingListRef
            .doc(listItem.id)
            .delete()
            .catch((error) => {
                alert(error);
            });
    }

    //edit listitem
    function onEditPress(listItem) {
        navigation.navigate('EditItemsShopping', { items: listItem });
    }

    return(
        <View style={styles.container}>
        <ImageBackground source={require('../imgs/background.png')} resizeMode="cover" style={styles.image}>
            <Text style={styles.title}>Lista della spesa</Text>
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
                {loading ? <ActivityIndicator size="large" color="#9e9e9e" /> : (
                    shoppingList.map((listItem, index) => {
                        if (listItem.party_id === party.id && listItem.name.toLowerCase().includes(search.toLowerCase())) {
                            return (
                                <View key={index} style={styles.listItemContainer}>
                                    <View style={styles.listItemView}>
                                        <CheckBox
                                            value={listItem.bought}
                                            style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }], marginRight: 10, marginLeft: 10 }}
                                            onValueChange={() => {
                                                shoppingListRef
                                                    .doc(listItem.id)
                                                    .update({
                                                        bought: !listItem.bought
                                                    })
                                                    .catch((error) => {
                                                        alert(error);
                                                });
                                            }}
                                        /> 
                                        <Text style={styles.listItemTitle}>{listItem.name}</Text>
                                        <TouchableOpacity style={styles.listItem} onPress={() =>
                                            {   let item = listItem;
                                                item.id = listItem.item_id;
                                                onEditPress(item)
                                            }}>
                                            <FontAwesomeIcon icon={ faEdit } size={ 25 } color="#fff" />
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.listItem} onPress={() => onDeletePress(listItem)}>
                                            <FontAwesomeIcon icon={ faTrash } size={ 25 } color="#f00" />
                                        </TouchableOpacity>
                                    </View>
                                    <View style={styles.listItemView}>
                                        <Text style={styles.listItem}>{listItem.price}€</Text>
                                        <Text style={styles.listItem}>{listItem.mark}</Text>  
                                    </View>    
                                </View>
                            )
                        }
                    })
                )}
            </ScrollView>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddShoppingItem', { party: party, shoppingList: shoppingList })}>
                    <Text style={styles.buttonTitle}>Aggiungi prodotto</Text>
                </TouchableOpacity>
            </ImageBackground>
        </View>
    );

}
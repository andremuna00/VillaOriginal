
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { firebase } from '../firebase/config';
import styles from './styles/global.js';


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
            alert("Item added!");
            navigation.goBack();
        }
        ).catch((error) => {
            alert(error);
        }

                
        )
    }


    return(
        <View style={styles.container}>
            <Text style={styles.title}>Add item to shopping list</Text>
            <TextInput
                style={styles.input}
                placeholder='Search'
                placeholderTextColor="#aaaaaa"
                onChangeText={(text) => setSearch(text)}
                value={search}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
            />
            <ScrollView>
                {items.map((item) => {
                    return (
                        <View style={styles.item} key={item.id}>
                            <Text style={styles.itemName}>{item.name}</Text>
                            <Text style={styles.itemPrice}>{item.price} $</Text>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => onAddPress(item)}
                            >
                                <Text style={styles.buttonTitle}>Add</Text>
                            </TouchableOpacity>
                        </View>
                    )
                }
                )}
            </ScrollView>
        </View>

    )
}
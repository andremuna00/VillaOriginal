import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import CheckBox from 'expo-checkbox'
import { firebase } from '../firebase/config';
import styles from './styles/global.js';



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
            console.log(doc);
                promises.push(
                    firebase.firestore().collection('items').doc(item_id).get().then((doc_per) => {
                        const { name,price,notes,creator_id } = doc_per.data();
                        shoppingList.push({
                            id: doc.id,
                            name,
                            price,
                            notes,
                            creator_id,
                            bought,
                            party_id,
                            item_id
                        });
                    }
                ));
        });
        Promise.all(promises).then(() => {
            console.log(shoppingList);
            setShoppingList(shoppingList);
            setLoading(false);
        });
    }

    useEffect(() => {
        shoppingListRef.onSnapshot(onCollectionUpdate);
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
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>Shopping List</Text>
                    <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
                    <View style={styles.container}>
                        <View style={styles.container}>
                            <Text style={styles.title}>Add Item</Text>
                            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
                            <View style={styles.container}>
                                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AddShoppingItem', { party: party, shoppingList: shoppingList })}>
                                    <Text style={styles.buttonTitle}>Add Item</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.title}>List</Text>
                        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
                        <View style={styles.container}>
                            <TextInput
                                style={styles.input}
                                placeholder='Search'
                                placeholderTextColor="#aaaaaa"
                                onChangeText={(text) => setSearch(text)}
                                value={search}
                                underlineColorAndroid="transparent"
                                autoCapitalize="none"
                            />
                        </View>
                        <View style={styles.container}>
                            {loading ? <ActivityIndicator size="large" color="#9e9e9e" /> : (
                                shoppingList.map((listItem, index) => {
                                    if (listItem.party_id === party.id && listItem.name.toLowerCase().includes(search.toLowerCase())) {
                                        return (
                                            <View key={index} style={styles.container}>
                                                <View style={styles.container}>
                                                    <Text style={styles.title}>{listItem.name}</Text>
                                                    <Text style={styles.title}>{listItem.price}</Text>
                                                    <Text style={styles.title}>{listItem.notes}</Text>
                                                    <CheckBox
                                                        value={listItem.bought}
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
                                                </View>
                                                <View style={styles.container}>
                                                    <TouchableOpacity style={styles.button} onPress={() => onEditPress(listItem)}>
                                                        
                                                        <Text style={styles.buttonTitle}>Edit</Text>
                                                    </TouchableOpacity>
                                                    <TouchableOpacity style={styles.button} onPress={() => onDeletePress(listItem)}>
                                                        <Text style={styles.buttonTitle}>Delete</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            </View>
                                        )
                                    }
                                })
                            )}
                        </View>
                    </View>
                </View>


            </ScrollView>
        </View>
    );

}
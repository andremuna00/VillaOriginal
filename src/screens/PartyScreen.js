
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { firebase } from '../firebase/config';
import styles from './styles/global.js';


//display four buttons: add a new party
export default function PartyScreen({route, navigation }){

    return(
        <View style={styles.container}>
            <View style={styles.verticalWrapper}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditParty')}>
                    <Text style={styles.buttonTitle}>Add party</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ListParty')}>
                    <Text style={styles.buttonTitle}>List of party</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditItemsShopping')}>
                    <Text style={styles.buttonTitle}>Add shopping Item</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}
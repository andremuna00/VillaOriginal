import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { firebase } from '../firebase/config';
import styles from './styles/global.js';

//screen with four buttons: list of guests, list of shopping items, list for the party, link to party photo
export default function ManagePartyScreen({route, navigation }) {

    return (
        <View style={styles.container}>
            <View style={styles.verticalWrapper} >
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ManageListGuests', {party: route.params.party})}>
                    <Text style={styles.buttonTitle}>List of guests</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ListItemsShopping', {party: route.params.party})}>
                    <Text style={styles.buttonTitle}>List of shopping items</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ListGuests', {party: route.params.party})}>
                    <Text style={styles.buttonTitle}>List for the party</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PartyPhoto', {party: route.params.party})}>
                    <Text style={styles.buttonTitle}>Party photo</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Analytics', {party: route.params.party})}>
                    <Text style={styles.buttonTitle}>Analytics</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

}

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { firebase } from '../firebase/config';
import styles from './styles/global.js';
import { ImageBackground } from 'react-native';

//display four buttons: add a new party
export default function PartyScreen({route, navigation }){

    return(
        <View style={styles.container}>
        <ImageBackground source={require('../imgs/background.png')} resizeMode="cover" style={styles.image}>
            <Text style={styles.title}>Feste</Text>
            <View style={styles.verticalWrapper}>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ListParty')}>
                    <Text style={styles.buttonTitle}>Lista delle feste</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditParty')}>
                    <Text style={styles.buttonTitle}>Aggiungi nuova festa</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditItemsShopping')}>
                    <Text style={styles.buttonTitle}>Aggiungi prodotto spesa</Text>
                </TouchableOpacity>

            </View>
            </ImageBackground>
        </View>
    )
}

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { firebase } from '../firebase/config';
import styles from './styles/global.js';
import { ImageBackground } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faList, faPlus, faShoppingBag } from '@fortawesome/free-solid-svg-icons';

//display four buttons: add a new party
export default function PartyScreen({route, navigation }){

    return(
        <View style={styles.container}>
        <ImageBackground source={require('../imgs/background.png')} resizeMode="cover" style={styles.image}>
            <Text style={styles.title}>Feste</Text>
            <View style={styles.verticalWrapper}>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ListParty')}>
                    <Text style={styles.buttonTitle}>Lista delle feste</Text>
                    <FontAwesomeIcon style={{margin: 10}} icon={faList} size={20} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditParty')}>
                    <Text style={styles.buttonTitle}>Aggiungi nuova festa</Text>
                    <FontAwesomeIcon style={{margin: 10}} icon={faPlus} size={20} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditItemsShopping')}>
                    <Text style={styles.buttonTitle}>Aggiungi prodotto spesa</Text>
                    <FontAwesomeIcon style={{margin: 10}} icon={faShoppingBag} size={20} color="white" />
                </TouchableOpacity>

            </View>
            </ImageBackground>
        </View>
    )
}
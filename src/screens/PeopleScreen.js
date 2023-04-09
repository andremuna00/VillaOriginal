
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { firebase } from '../firebase/config';
import styles from './styles/global.js';
import { ImageBackground } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faList, faPlus } from '@fortawesome/free-solid-svg-icons';

//display two buttons: add new person and visualize list of persons
export default function PeopleScreen({route, navigation }){

    return(
        <View style={styles.container}>
        <ImageBackground source={require('../imgs/background.png')} resizeMode="cover" style={styles.image}>
        <Text style={styles.title}>Persone</Text>
            <View style={styles.verticalWrapper}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ListPeople')}>
                    <Text style={styles.buttonTitle}>Lista delle persone</Text>
                    <FontAwesomeIcon style={{margin: 10}} icon={faList} size={20} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditPeople')}>
                    <Text style={styles.buttonTitle}>Aggiungi nuova persona</Text>
                    <FontAwesomeIcon style={{margin: 10}} icon={faPlus} size={20} color="white" />
                </TouchableOpacity>

                
            </View>
            </ImageBackground>
        </View>
    )
}
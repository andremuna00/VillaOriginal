
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { firebase } from '../firebase/config';
import styles from './styles/global.js';
import { ImageBackground } from 'react-native';

//display two buttons: add new person and visualize list of persons
export default function PeopleScreen({route, navigation }){

    return(
        <View style={styles.container}>
        <ImageBackground source={require('../imgs/background.png')} resizeMode="cover" style={styles.image}>
        <Text style={styles.title}>Persone</Text>
            <View style={styles.verticalWrapper}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditPeople')}>
                    <Text style={styles.buttonTitle}>Aggiungi nuova persona</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ListPeople')}>
                    <Text style={styles.buttonTitle}>Lista delle persone</Text>
                </TouchableOpacity>
            </View>
            </ImageBackground>
        </View>
    )
}
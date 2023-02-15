
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { firebase } from '../firebase/config';
import styles from './styles/global.js';


//display two buttons: add new person and visualize list of persons
export default function PeopleScreen({route, navigation }){

    return(
        <View style={styles.container}>
            <View style={styles.verticalWrapper}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('EditPeople')}>
                    <Text style={styles.buttonTitle}>Add new person</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ListPeople')}>
                    <Text style={styles.buttonTitle}>List of people</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
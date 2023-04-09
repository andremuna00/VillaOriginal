import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { firebase } from '../firebase/config';
import styles from './styles/global.js';
import { ImageBackground } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPeopleGroup, faShoppingCart, faPhotoVideo, faChartPie, faListCheck } from '@fortawesome/free-solid-svg-icons';

//screen with four buttons: list of guests, list of shopping items, list for the party, link to party photo
export default function ManagePartyScreen({route, navigation }) {

    return (
        <View style={styles.container}>
        <ImageBackground source={require('../imgs/background.png')} resizeMode="cover" style={styles.image}>
            <Text style={styles.title}>{route.params.party.name}</Text>
            <View style={styles.verticalWrapper} >
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ManageListGuests', {party: route.params.party})}>
                    <Text style={styles.buttonTitle}>Lista degli invitati</Text>
                    <FontAwesomeIcon style={{margin: 10}} icon={faPeopleGroup} size={20} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ManageShoppingList', {party: route.params.party})}>
                    <Text style={styles.buttonTitle}>Lista della spesa</Text>
                    <FontAwesomeIcon style={{margin: 10}} icon={faShoppingCart} size={20} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ListGuests', {party: route.params.party})}>
                    <Text style={styles.buttonTitle}>Lista per la festa</Text>
                    <FontAwesomeIcon style={{margin: 10}} icon={faListCheck} size={20} color="white" />
                </TouchableOpacity>

                
            </View>
            <View style={{flexDirection: "row"}}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('PartyPhoto', {party: route.params.party})}>
                    <FontAwesomeIcon style={{margin: 10}} icon={faPhotoVideo} size={20} color="white" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Analytics', {party: route.params.party})}>
                    <FontAwesomeIcon style={{margin: 10}} icon={faChartPie} size={20} color="white" />
                </TouchableOpacity>
            </View>
            </ImageBackground>
        </View>
    )

}
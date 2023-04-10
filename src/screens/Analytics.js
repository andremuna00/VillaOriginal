
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert  } from 'react-native';
import { firebase } from '../firebase/config';
import styles from './styles/global.js';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { ImageBackground } from 'react-native';
import PieChart from 'react-native-pie-chart';


export default function Analytics({route, navigation }){

    //get all people from database
    const [party, setParty] = useState(route.params.party);

    const [totalPrice, setTotalPrice] = useState(0);
    const [totalIncoming, setTotalIncoming] = useState(0);
    const [expectedIncoming, setExpectedIncoming] = useState(0);
    const [sexes, setSexes] = useState([1,1]);
    const [years, setYears] = useState([]);
    const [uniqueYears, setUniqueYears] = useState([]);
    const [NGuests, setNGuests] = useState(0);
    const [NConfirmed, setNConfirmed] = useState(0);
    const [NPayed, setNPayed] = useState(0);

    useEffect(() => {
        //get list of confirmed people
        const peopleRef = firebase.firestore().collection('guests').where("party_id", "==", party.id).where("confirmed", "==", true);
        let income = 0;
        let exp = 0;
        let sexs=[];
        let ys = [];
        firebase.firestore().collection('guests').where("party_id", "==", party.id).get().then((querySnapshot) => {
            setNGuests(querySnapshot.size);
        });
        firebase.firestore().collection('guests').where("party_id", "==", party.id).where("confirmed", "==", true).get().then((querySnapshot) => {
            setNConfirmed(querySnapshot.size);
        });
        firebase.firestore().collection('guests').where("party_id", "==", party.id).where("payed", "==", true).get().then((querySnapshot) => {
            setNPayed(querySnapshot.size);
        });
        //count incoming and expected incoming. Save people in array
        const promisespeople = [];
        peopleRef.get().then((querySnapshot) => {
            const people = [];
            querySnapshot.forEach((doc) => {
                promisespeople.push(firebase.firestore().collection('people').doc(doc.data().person_id).get().then((doc) => {
                    if(doc.exists){
                        people.push(doc.data());
                    }
                }));
                if(doc.data().payed){
                    income = income + parseInt(party.price);
                }
                exp = exp + parseInt(party.price);

            });
            //save all sexs and yeats
            Promise.all(promisespeople).then(() => {
                people.forEach((doc) => {
                sexs.push(doc.sex)
                ys.push(doc.birthday)
                });
                
            //count male and female
            var male = 0;
            var female = 0;
            for(var i=0; i<sexs.length; i++){

                if(sexs[i] == "M")
                    male +=1;
                if(sexs[i] == "F")
                    female+=1;
            }
            sexs = [male, female];
            //count years
            //find all different years
            var uniqueYears = [];
            ys.forEach(function(i) {
                if(uniqueYears.indexOf(i) < 0) {
                    uniqueYears.push(i);
                }
            });
            setUniqueYears(uniqueYears);
            //count number of people for each year
            var count = [];
            for(var i=0; i<uniqueYears.length; i++){
                var c = 0;
                for(var j=0; j<ys.length; j++){
                    if(uniqueYears[i] == ys[j]){
                        c+=1;
                    }
                }
                count.push(c);
            }
            ys = count;


            setSexes(sexs);
            setYears(ys);
            setTotalIncoming(income);
            setExpectedIncoming(exp);
        });
        });

        //compute total price from shopping list
        let price = 0;
        const promises = [];
        const shoppingRef = firebase.firestore().collection('shopping_list').where("party_id", "==", party.id);
        shoppingRef.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                var shoppedItem = doc.data();
                promises.push(firebase.firestore().collection('items').doc(shoppedItem.item_id).get().then((doc) => {
                    if(doc.exists){
                        price=price+(parseInt(doc.data().price)*parseInt(shoppedItem.quantity));
                    }
                }));


            });
            Promise.all(promises).then(() => {
                setTotalPrice(price);
            });
        });
        
    }, []);



    return(
        <View style={styles.container}>
        <ImageBackground source={require('../imgs/background.png')} resizeMode="cover" style={styles.image}>
            <ScrollView>
            <Text style={styles.title}>Analytics</Text>
            <Text style={{color: "white"}}>Spesa Totale: {totalPrice}€</Text>
            <Text style={{color: "white"}}>Numero totale di invitati: {NGuests}</Text>
            <Text style={{color: "white"}}>Numero totale di confermati: {NConfirmed}</Text>
            <Text style={{color: "white"}}>Numero totale di paganti: {NPayed}</Text>
            <Text style={{color: "white"}}>Spesa personale: DA FARE</Text>
            <Text style={{color: "white"}}>Entrate effettive (solo persone che hanno pagato): {totalIncoming}€</Text>
            <Text style={{color: "white"}}>Entrate previste (solo confermati): {expectedIncoming}€</Text>
            <Text style={{color: "white"}}>Numero di maschi (solo confermati): {sexes[0]}</Text>
            <Text style={{color: "white"}}>Numero di femmine (solo confermati): {sexes[1]}</Text>
            {years.map((year, index) => (
                <Text key={index} style={{color: "white"}}>Numero di persone nate nel {uniqueYears[index]}: {year}</Text>
            ))}
            </ScrollView>


        </ImageBackground>
        </View>
    )
}
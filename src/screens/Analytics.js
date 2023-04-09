
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

    //compute total price
    const [totalPrice, setTotalPrice] = useState(0);
    //compute total incoming from people
    const [totalIncoming, setTotalIncoming] = useState(0);
    //compute number of sex
    const [sexes, setSexes] = useState([1,1]);
    //compute list of years
    const [years, setYears] = useState([]);
    const [uniqueYears, setUniqueYears] = useState([]);

    useEffect(() => {
        //get list of confirmed people
        const peopleRef = firebase.firestore().collection('guests').where("party_id", "==", party.id).where("confirmed", "==", true);
        let income = 0;
        let sexs=[];
        let ys = [];
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
            });
            Promise.all(promisespeople).then(() => {
                people.forEach((doc) => {
                sexs.push(doc.sex)
                ys.push(doc.birthday)
                });
                
            
            var male = 0;
            var female = 0;
            //count male
            for(var i=0; i<sexs.length; i++){

                if(sexs[i] == "M")
                    male +=1;
                if(sexs[i] == "F")
                    female+=1;
            }
            sexs = [male, female];
            console.log(ys);
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
        });
        });
        let price = 0;
        const promises = [];
        //compute number of shopping items in the list
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
            <Text style={styles.title}>Analytics</Text>
            <Text style={styles.text}>Total price: {totalPrice}€</Text>
            <Text style={styles.text}>Total incoming: {totalIncoming}€</Text>
            <Text style={styles.text}>Number of male: {sexes[0]}</Text>
            <Text style={styles.text}>Number of female: {sexes[1]}</Text>
            {years.map((year, index) => (
                <Text key={index} style={styles.text}>Number of people born in {uniqueYears[index]}: {year}</Text>
            ))}


        </ImageBackground>
        </View>
    )
}
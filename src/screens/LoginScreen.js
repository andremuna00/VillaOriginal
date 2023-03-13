
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { firebase } from '../firebase/config';
import styles from './styles/global.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ImageBackground } from 'react-native';

export default function LoginScreen({route, navigation }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const auth = firebase.auth();

    const onLoginPress = () => {
        setLoading(true);
        auth
            .signInWithEmailAndPassword(email, password)
            .then(() => {
                setLoading(false);
                //save user data in local storage
                const user = firebase.auth().currentUser;
                const uid = user.uid;
                const email = user.email;
                const name = user.displayName;
                const photoUrl = user.photoURL;
                const emailVerified = user.emailVerified;
                const phoneNumber = user.phoneNumber;
                const providerData = user.providerData;
                const userObj = {
                    uid: uid,
                    email: email,
                    name: name,
                    photoUrl: photoUrl,
                    emailVerified: emailVerified,
                    phoneNumber: phoneNumber,
                    providerData: providerData,
                    password: password
                };
                //save user data in local storage
                AsyncStorage.setItem('user', JSON.stringify(userObj));

                navigation.reset({
                    index: 0,
                    routes: [{name: 'Home'}],
                  });
            })
            .catch(error => {
                setLoading(false);
                setError(error.message);
            });
    };

    return (
        <View style={styles.container}>
        <ImageBackground source={require('../imgs/background.png')} resizeMode="cover" style={styles.image}>
            <Text style={styles.greeting}>{`Ciao. \nBentornato.`}</Text>

            <View style={styles.errorMessage}>
                {error ? <Text style={styles.error}>{error}</Text> : null}
            </View>

            <View style={styles.form}>

                <View>
                    <Text style={styles.inputTitle}>Email</Text>
                    <TextInput
                        style={styles.input}
                        autoCapitalize="none"
                        onChangeText={email => setEmail(email)}
                        value={email}
                    ></TextInput>
                </View>

                <View style={{ marginTop: 32 }}>
                    <Text style={styles.inputTitle}>Password</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry
                        autoCapitalize="none"
                        onChangeText={password => setPassword(password)}
                        value={password}
                    ></TextInput>
                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={onLoginPress}>
                <Text style={{ color: "#FFF", fontWeight: "500" }}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={{ alignSelf: "center", marginTop: 32 }}
                onPress={() => navigation.navigate("Register")}
            >
                <Text style={{ color: "#414959", fontSize: 13 }}>
                    New to SocialApp? <Text style={{ fontWeight: "500", color: "#E9446A" }}>Registrati</Text>
                </Text>
            </TouchableOpacity>
            </ImageBackground>
        </View>
    );

}
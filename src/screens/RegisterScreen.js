
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { firebase } from '../firebase/config';
import styles from './styles/global.js';
import { ImageBackground } from 'react-native';

export default function RegisterScreen({route, navigation }) {
    
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState('');
    
        const auth = firebase.auth();
    
        const onRegisterPress = () => {
            setLoading(true);
            auth
                .createUserWithEmailAndPassword(email, password)
                .then(() => {
                    setLoading(false);
                    navigation.navigate('Login');
                })
                .catch(error => {
                    setLoading(false);
                    setError(error.message);
                });
        };
    
        return (
            <View style={styles.container}>
            <ImageBackground source={require('../imgs/background.png')} resizeMode="cover" style={styles.image}>
                <Text style={styles.greeting}>{`Hello again. \nWelcome back.`}</Text>
    
                <View style={styles.errorMessage}>
                    {error ? <Text style={styles.error}>{error}</Text> : null}
                </View>
    
                <View style={styles.form}>
    
                    <View>
                        <Text style={styles.inputTitle}>Email Address</Text>
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
    
                <TouchableOpacity style={styles.button} onPress={onRegisterPress}>
                    <Text style={{ color: "#FFF", fontWeight: "500" }}>Sign up</Text>
                </TouchableOpacity>
    
                <TouchableOpacity
                    style={{ alignSelf: "center", marginTop: 32 }}
                    onPress={() => navigation.navigate('Login')}
                >
                    <Text style={{ color: "#414959", fontSize: 13 }}>
                        New to SocialApp? <Text style={{ fontWeight: "500", color: "#E9446A" }}>Login</Text>
                    </Text>
                </TouchableOpacity>
                </ImageBackground>
            </View>
        );

}
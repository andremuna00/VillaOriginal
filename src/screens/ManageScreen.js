import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import CheckBox from 'expo-checkbox'
import { firebase } from '../firebase/config';
import styles from './styles/global.js';
import { ImageBackground } from 'react-native';

//page for managing roles of the registered users
//read and store from the database table UserRoles. Document Id is the id of the user and document content is a list of roles
export default function ManageScreen({route, navigation }) {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const unsubscribe = firebase
            .firestore()
            .collection('UserRoles')
            .onSnapshot(querySnapshot => {
                const users = [];
                querySnapshot.forEach(documentSnapshot => {
                    users.push({
                        ...documentSnapshot.data(),
                        key: documentSnapshot.id,
                    });
                });
                setUsers(users);
                setLoading(false);
            }, error => {
                setError(error);
                setLoading(false);
            });
        return () => unsubscribe();
    }, []);

    if (loading) {
        return <ActivityIndicator />;
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }

    const EditRoles = (user, rolename) => {
        if (user.roles.includes(rolename)) {
            user.roles = user.roles.filter(item => item !== rolename)
        }
        else {
            user.roles.push(rolename);
        }
        firebase.firestore().collection('UserRoles').doc(user.key).set(user);
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../imgs/background.png')} resizeMode="cover" style={styles.image}>
            <Text style={styles.title}>{`Manage Roles`}</Text>
            <FlatList
                data={users}
                renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Text style={styles.listItemTitle}>{item.email}</Text>
                            <View style={styles.listItemView}>
                                <CheckBox
                                    style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }], margin: 10 }}
                                    value={item.roles.includes('admin')}
                                    onValueChange={() => EditRoles(item, 'admin')}
                                    disabled={false}
                                />
                                <Text style={styles.secondaryText}>Admin</Text>
                            </View>
                            <View style={styles.listItemView}>
                            <CheckBox
                                style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }], margin: 10 }}
                                value={item.roles.includes('user')}
                                onValueChange={() => EditRoles(item, 'user')}
                                disabled={false}
                            />
                            <Text style={styles.secondaryText}>User</Text>
                            </View>
                            <View style={styles.listItemSeparator}></View>
                        </View>
                )}
            />
            </ImageBackground>
        </View>
    );
}

import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function PerfilScreen() {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const data = await AsyncStorage.getItem('UserData');
                if (data !== null) {
                    setUserData(JSON.parse(data));
                }
            } catch (error) {
                console.error("Error fetching user data", error);
            }
        };

        fetchUserData();
    }, []);

    if (!userData) {
        return (
            <View style={styles.container}>
                <Text>No se encontraron datos de usuario.</Text>
            </View>
        );
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.avatarContainer}>
                <Image style={styles.avatar} source={require('../assets/avatar.png')} />
            </View>

            <View style={styles.card}>
                <View style={styles.row}>
                    <Text style={styles.label}>Nombre:</Text>
                    <Text style={styles.info}>{userData.username} {userData.lastname}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Dirección:</Text>
                    <Text style={styles.info}>{userData.address}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Teléfono:</Text>
                    <Text style={styles.info}>{userData.phone}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.info}>{userData.email}</Text>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#f5f5f5',
    },
    avatarContainer: {
        marginTop: 20,
        marginBottom: 20,
        padding: 20, 
        alignItems: 'center',
    },
    avatar: {
        width: 150,  
        height: 150, 
        borderRadius: 60,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        width: '90%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        alignItems: 'flex-start',
    },
    row: {
        flexDirection: 'row',  
        justifyContent: 'space-between',  
        width: '100%', 
        marginTop: 10,
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333',
        width: '40%',  
    },
    info: {
        fontSize: 16,
        color: '#555',
        width: '60%',  
    },
});
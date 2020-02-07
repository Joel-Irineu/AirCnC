import React, {useState, useEffect} from 'react';
import socketio from 'socket.io-client';
import {Alert, View, SafeAreaView, ScrollView, Text, StyleSheet, Image, AsyncStorage, TouchableOpacity} from 'react-native';

import SpotList from '../components/SpotList';

import logo from '../assets/logo.png';

export default function List({navigation}){
    const [techs, setTechs] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem('user').then(user_id => {
            const socket = socketio('http://192.168.0.108:3333', {
                query: {user_id}
            })

            socket.on('booking_response', booking =>{
                Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`);            })
        })
    })

    useEffect(() => {
        AsyncStorage.getItem('techs').then(storegedTechs => {
            const techsArray = storegedTechs.split(',').map(tech => tech.trim());
       
            setTechs(techsArray);
        })
    }, []);

    async function logOut() {
        await AsyncStorage.setItem('user', '');

        navigation.navigate('Login');
    }

    return( 
        <SafeAreaView style={styles.container}>
           <View style={styles.nav}>
            <Image style={styles.logo} source={logo} />
            
            <TouchableOpacity onPress={() => logOut()} style={styles.button}>
                <Text style={styles.buttonText}>Sair do usuario</Text>
            </TouchableOpacity>
            </View>

            <ScrollView>
                {techs.map(tech => <SpotList key={tech} tech={tech} />)}
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    nav:{
        flexDirection: 'row'
    },
    logo: {
        height: 32,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginTop: 30,
    },
    button:{
        height: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        margin: 10,
        alignSelf: 'flex-end',
        marginTop: 40,
        marginLeft: 110,
    },
    buttonText:{
        color: '#f05a5b',
        fontWeight: 'bold',
        fontSize: 10,
    }
});
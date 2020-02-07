import React, {useState} from 'react';
import {KeyboardAvoidingView , Alert, AsyncStorage, StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native';

import api from '../services/api'

export default function Book({navigation}){
    const [date, setDate] = useState('');
    const id = navigation.getParam('id');

    async function handleSubmit(){
        const user_id = await AsyncStorage.getItem('user');

        await api.post(`/spots/${id}/bookings`, {
            date
        }, {
            headers: {user_id}
        })

        Alert.alert('solicitação de reserva enviada!');

        navigation.navigate('List');
    };
    function handleCancel(){
        navigation.navigate('List');
    }

    return (
        <KeyboardAvoidingView behavior='padding' style={styles.container}>

            <Text styles={styles.label}>DATA DE INTERESSE *</Text>
            <TextInput
                style={styles.imput}
                placeholder='Qual data você quer reservar?'
                placeholderTextColor='#999'
                autoCapitalize='words'
                autoCorrect={false}
                value={date}
                onChangeText={setDate}
            />
            <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Solicitar reserva</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel} style={[styles.button, styles.cancelButton]}>
                <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView >
    )
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        margin:30,
        marginTop: 50,
    },
    label:{
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 0,
    },
    imput:{
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize: 16,
        color: "#444",
        height: 44,
        marginBottom: 20,
        borderRadius: 2,
    },
    cancelButton:{
    backgroundColor: '#ccc',
    marginTop: 10,
    },
    button:{
        height: 42,
        backgroundColor: '#f05a5b',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 2,
        },
    buttonText:{
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    }
});
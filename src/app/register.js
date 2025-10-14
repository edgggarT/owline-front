import { View, Text, Alert, TouchableOpacity } from "react-native";
import React, {useState} from "react";
import { Formik, useFormikContext } from "formik";
import { router } from "expo-router";
import axios from "axios";
import {MaterialCommunityIcons} from '@expo/vector-icons'


import { API_URLS } from "../constants/ApiConfig";
import { useAuth } from "../hooks/AuthContext";
import { RegisterSchema } from "../hooks/RegisterSchema";
import FormInput from "../components/FormInput/FormInput";
import { colors } from "../styles/globalStyle";
import { styles } from "../styles/register.style";
import { Button } from "react-native-elements";

const passwordRegex = {
    minLength: /^.{10,}$/,          
    hasUpper: /(?=.*[A-Z])/,      
    hasLower: /(?=.*[a-z])/,      
    hasNumber: /(?=.*\d)/,        
};

export default function Register() {

    const {register} = useAuth()

    const initialValues = {
        name: '',
        email: '',
        password: '',
        repeatPassword: ''
    }

    async function onSubmit(values, {setSubmitting}) {
        console.log('Datos del front al back: ', values)

        try {
            const success = await register(values.name, values.email, values.password)
            if (!success) {
                Alert.alert('Error de registro: ', 'Correo ya registrado por otro usuario!')
            }
        } catch (e) { 
            Alert.alert('Error de conexion, Verifique su internet o intentelo mas tarde')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <View style={styles.container}>
            <Formik initialValues={initialValues} 
                    validationSchema={RegisterSchema}
                    onSubmit={onSubmit}>    

                {({values ,handleSubmit, isSubmitting, handleBlur, handleChange}) => {
                    const password = values.password || '';

                    const checks = [
                        {label: 'Tiene una mayuscula', isValid: passwordRegex.hasUpper.test(password) },
                        {label: 'Tiene una minuscula', isValid: passwordRegex.hasLower.test(password) },
                        {label: 'Tiene un numero', isValid: passwordRegex.hasNumber.test(password) },
                        {label: 'Tiene 10 caracteres', isValid: passwordRegex.minLength.test(password) },
                    ]

                return (
                    <View style={styles.formContainer}>
                        <Text style={styles.subtext}>Formulario para poder registrar tu usuario en la aplicacion</Text>
                        <FormInput name="name" 
                                   placeholder="Nombre completo"
                                   style={styles.inputText} 
                                   rightIcon={<MaterialCommunityIcons name="human-greeting" size={20}/>}/>
                        <FormInput name="email" 
                                   placeholder="Correo electronico"
                                   style={styles.inputText} 
                                   rightIcon={<MaterialCommunityIcons name="at" size={20}/>}/>
                        <FormInput name="password" 
                                   placeholder="Contraseña"
                                   style={styles.inputText} 
                                   rightIcon={<MaterialCommunityIcons name="security" size={20}/>}
                                   onChangeText={handleChange('password')}
                                   onBlur={handleBlur('password')}
                                   value={password}/>

                        {checks.map((check, index) => (
                            <View key={index} style={styles.containerCheckMap}>
                                <Text style={styles.text}>{check.label}</Text>
                                <MaterialCommunityIcons name={check.isValid ? 'check-circle' : 'close-circle'}
                                                        color={check.isValid ? 'green' : 'red'}
                                                        size={20}/>
                            </View>
                        ))}
                        
                        <FormInput name="repeatPassword" 
                                   placeholder="Repetir Contraseña"
                                   style={styles.inputText} 
                                   rightIcon={<MaterialCommunityIcons name="exclamation-thick" size={20}/>}/>

                        <TouchableOpacity style={styles.button} onPress={() => handleSubmit()} disabled={isSubmitting}>
                            <Text style={styles.buttonText}>
                                {isSubmitting ? 'Registrando...' : 'Registrarse'} 
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}}
            </Formik>
        </View>
    )}

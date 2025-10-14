import {React, useEffect, useState }from "react";
import { View , ScrollView, Alert, Text, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { Link, router, useLocalSearchParams} from "expo-router";
import { Formik } from "formik";
import Toast from "react-native-toast-message";

import LoginSchema from "../hooks/LoginSchema";
import FormInput from "../components/FormInput/FormInput";
import styles from "../styles/login.style";

import { useAuth } from "../hooks/AuthContext";


export default function LoginScreen() {
    
    const {login} = useAuth();
    const [showPassword, setShowPassord] = useState(false)
    const params = useLocalSearchParams();

    useEffect(() => {
        if (params.registered === 'true') {
            Toast.show({
                type: 'success',
                text1: 'Registro de usuario exitoso!',
                position: 'top', 
                visibilityTime: 3000,
            });
        }
    })

    const onSubmit = async (values, {setSubmitting}) => {
        try {
            const success = await login(values.email, values.password)
 
            if (!success) {
                Alert.alert('Error de autenticacion', 'Correo o contraseña incorrectos, Intentelo de nuevo')
            } 
        } catch (error) {
            Alert.alert('Error de conexion, verifique su conexion a internet')
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <KeyboardAvoidingView style={{flex: 1}} 
                              behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                              keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100}>
            <ScrollView style={styles.scroll} 
            contentContainerStyle={styles.container} 
            keyboardShouldPersistTaps='handled'>
                <Toast />
                <View style={{alignItems: 'center'}}>
                    <MaterialCommunityIcons name="owl" size={60} />
                    <Text style={styles.title}>OWLINE</Text>
                </View>

                <Formik initialValues={{ email: '', password: ''}} 
                        validationSchema={LoginSchema} 
                        onSubmit={onSubmit}>
                    {({handleSubmit, isSubmitting}) => (
                        <View style={styles.formContainer}>
                            
                            <FormInput name="email" 
                                    placeholder="Correo Electronico"
                                    rightIcon={<MaterialCommunityIcons name="at" size={30}/>}
                                    style={styles.inputText}
                                    
                                    />
                                    
                            <FormInput name="password" 
                                    placeholder="Contraseña" 
                                    secureTextEntry={showPassword} 
                                    rightIcon={<TouchableOpacity onPress={() => setShowPassord(!showPassword)}>
                                                    <MaterialCommunityIcons name={showPassword ? 'eye-off' : 'eye'} size={30}/>
                                                </TouchableOpacity>}
                                        style={styles.inputText}
                                    />

                            <TouchableOpacity 
                                        onPress={() => handleSubmit()} 
                                        disabled={isSubmitting}
                                        style={styles.button}>
                                <Text style={styles.buttonText}>
                                    {isSubmitting ? 'Iniciando...' : 'Iniciar Sesion'}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                        onPress={() => router.push('/register')} 
                                    style={styles.button}>
                                <Text style={styles.buttonText}>
                                    Registrarse
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
                <Text style={styles.subtext}>
                    Inicio de sesion al sistema de gestion de clientes
                </Text>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
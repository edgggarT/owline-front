import { View, Text, Alert, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native'
import React, {useState} from 'react'
import { Formik } from 'formik'
import { router } from 'expo-router'
import axios from 'axios'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { API_URLS } from '../constants/ApiConfig'
import { useAuth } from '../hooks/AuthContext'
import ProfileSchema from '../hooks/ProfileSchema'
import FormInput from '../components/FormInput/FormInput'
import { styles } from '../styles/profile.style'
import { colors } from '../styles/globalStyle'


export default function Profile() {
    const {userInfo, updateUserInfo} = useAuth()
    const [isSaving, setIsSaving] = useState(false)

    const initialValues = {
        name: userInfo.name,
        email: userInfo.email,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    };

    const onSubmit = async (values, {setSubmitting}) => {
        setSubmitting(true);
        setIsSaving(true);

        console.log('Datos del front al back: ', values)

        // LOGICA BACKEND 
        try {
            const response = await axios.patch(`${API_URLS.BASE_URL}${API_URLS.PROFILE}`, values)

            if (response.status === 200) {
                Alert.alert('Exito', response.data.msg || 'Tus datos han sido actualizados') 

                const newName = response.data.name;
                const newEmail = response.data.email

                if (newName || newEmail) {
                    updateUserInfo({
                        name: newName,
                        email: newEmail
                    })
                }
                router.back()
            }
        } catch (error) {
            const errorMessage = error.response?.data?.msg || 'Error de conexion o datos invalidos'
            Alert.alert('Error', errorMessage);
            console.error('Error al actualizar perfil: ', error.response?.data || error.message)
        } finally {
            setSubmitting(false)
            setIsSaving(false)
        }

        if (success) {
            Alert.alert('Exito', 'Datos actualizados')

            if (values.name || values.email) {
                updateUserInfo({
                    name: values.name,
                    email: values.email
                })
            }

            resetForm();
        } else {
            Alert.alert('Error', 'No se pudieron guardar los datos')
        }

        setSubmitting(false);
        setIsSaving(false)
    }


    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
                              style={{flex: 1}}
                              keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -120}>
            <ScrollView contentContainerStyle={styles.container} 
                        style={styles.scroll}
                        keyboardShouldPersistTaps='handled'>
                <Text style={styles.textTitle}>Modificar Informacion</Text> 
                <Text style={styles.textSub}>Puedes rellenar con informacion nueva o actual</Text>

                <Formik initialValues={initialValues} 
                        validationSchema={ProfileSchema} 
                        onSubmit={onSubmit}
                        enableReinitialize={true}>
                    
                    {({handleSubmit, isSubmitting}) => (
                        <View style={styles.formContainer}>
                            <Text style={styles.label}>Nombre</Text>
                            <FormInput name='name' 
                                    placeholder='Nombre actual o nuevo nombre' 
                                    rightIcon={<MaterialCommunityIcons name='rename-box' size={30} color={colors.thirdColor}/>}
                                    style={styles.input}/>
                            <Text style={styles.label}>Correo Electronico</Text>
                            <FormInput name='email' 
                                    placeholder='Correo actual o Nuevo correo' 
                                    rightIcon={<MaterialCommunityIcons name='at' size={30} color={colors.thirdColor}/>}
                                    style={styles.input}/>
                            <Text style={styles.label}>Contraseña Actual</Text>
                            <FormInput name='currentPassword' 
                                    placeholder='Ingrese su contraseña actual' 
                                    rightIcon={<MaterialCommunityIcons name='security' size={30} color={colors.thirdColor}/>}
                                    style={styles.input}/>
                            <Text style={styles.label}>Nueva Contraseña</Text>
                            <FormInput name='newPassword' 
                                    placeholder='Ingresar nueva contraseña ' 
                                    rightIcon={<MaterialCommunityIcons name='form-textbox-password' size={30} color={colors.thirdColor}/>}
                                    style={styles.input}/>
                            <Text style={styles.label}>Confirmar nueva contraseña</Text>
                            <FormInput name='confirmPassword' 
                                    placeholder='Repetir nueva contraseña' 
                                    rightIcon={<MaterialCommunityIcons name='form-textbox-lock' size={30} color={colors.thirdColor}/>}
                                    style={styles.input}/>
                            <TouchableOpacity onPress={() => handleSubmit()}
                                            disabled={isSubmitting || isSaving} 
                                            style={styles.button}>
                                <Text style={styles.buttonText}>
                                    {isSaving ? 'Guardando...' : 'Guardar cambios'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
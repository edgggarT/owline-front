import { Formik, useFormikContext } from "formik";
import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { UpdateSchema, SearchSchema } from "../../hooks/UpdateSchema";
import axios from "axios";
import Toast from "react-native-toast-message";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import FormInput from "../../components/FormInput/FormInput";
import { API_URLS } from "../../constants/ApiConfig";
import { colors } from "../../styles/globalStyle";
import { styles } from "../../styles/update.style";



export default function Update() {

    const [foundUser, setFoundUser] = useState(null)
    const [error, setError] = useState(null)
    const [isUpdating, setIsUpdating] = useState(false)
    const [dniToUpdate, setDniToUpdate] = useState(null)
    
    const onUpdate = async (fieldsToUpdate) => {
        setIsUpdating(true)
        try {
            const response = await axios.patch(`${API_URLS.BASE_URL}${API_URLS.CLIENTS}`, {dni: dniToUpdate, 
                                                                                           updates: fieldsToUpdate})
            setFoundUser(null)
            Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Cliente actualizado correctamente'
            })
            console.log('Se actualizaran los datos del siguiente DNI: ', dniToUpdate)
            console.log('Se enviaron los siguientes datos: ', fieldsToUpdate)
            console.log('Respuesta del backend :', response.data)
        } catch (e) {
            if (e.response) {
                const statusCode = e.response.status
                const err = e.response?.data.msg

                if (statusCode === 409) {
                    if (err === 'El email ya esta registrado') {
                        Alert.alert('Error', err)
                    }
                }
            }
        } finally {
            setIsUpdating(false)
        }
    }

    const handleUpdate = (values, {setSubmitting}) => {
        const fieldToSend = Object.keys(values).reduce((acc, key) => {
            if (values[key] !== "" && key !== 'dni') {
                acc[key] = values[key]
            }
            return acc
        }, {})

        if (Object.keys(fieldToSend).length === 0) {
            Alert.alert('Atencion', 'No se detectaron campos para actualizar')
            setSubmitting(false)
            return;
        }

        const nameForAlert = foundUser?.nombre || dniToUpdate
        Alert.alert('Confirmar Actualizacion', 
                    `¿Esta seguro de actualizar a ${nameForAlert}?`, 
                    [{text: 'Cancelar', onPress:()=>setSubmitting(false), style: 'cancel'},
                     {text: 'Actualizar', onPress:()=>onUpdate(fieldToSend), style: "destructive"}])
    }


  const onSubmit = async (values, {setSubmitting, resetForm}) => {
        setFoundUser(null)
        setError(null)

        try {
            const dniSearch = values.dni
            const response = await axios.get(`${API_URLS.BASE_URL}${API_URLS.CLIENTSgetdni}`, {params: {dni: dniSearch}})
            const {data} = response
            if (data) {
                setDniToUpdate(data.dni)
                setFoundUser(data)
                resetForm()
            } else {
                setError('Usuario no encontrado con el DNI: ', dniSearch)
                console.log('Usuario no encontrado.')
            }

        } catch (e) {
            setError('Ocurrio un error en el servidor')
            console.log(`ERROR BACKEND: ${e}`)
        } finally {
            setSubmitting(false)
        }
    }
  
      return (
            <KeyboardAvoidingView style={{flex: 1}} 
                                  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView style={styles.scroll}
                            contentContainerStyle={styles.container}>
                    <Formik initialValues={{ 
                                            dni: ''
                                            }}
                            validationSchema={SearchSchema}
                            onSubmit={onSubmit}>
                                
                            {({handleSubmit, isSubmitting, handleBlur, handleChange, values})=>(
                                <View style={styles.formContainer}>
                                    
                                    <FormInput name="dni" 
                                        placeholder="DNI" 
                                        keyboardType="numeric"
                                        rightIcon={<MaterialCommunityIcons name="card-account-details" size={30} color={colors.thirdColor}/>}
                                        style={styles.inputText}
                                        onChange={handleChange('dni')}
                                        onBlur={handleBlur('dni')}
                                        value={values.dni}/>
                                    
                                    <TouchableOpacity onPress={() => handleSubmit()} 
                                                        disabled={isSubmitting}
                                                        style={styles.button}>
                                        <Text style={styles.buttonText}>
                                            {isSubmitting ? <ActivityIndicator size='small' color={colors.secondaryColor}/> : <MaterialCommunityIcons name="clipboard-search-outline" size={30} color={colors.secondaryColor}/>}
                                        </Text>
                                    </TouchableOpacity>

                                    {error && (
                                        <View style={styles.containerError}>
                                            <MaterialCommunityIcons name="badge-account-alert-outline" size={120} color={colors.clearButton}/>
                                            <Text style={styles.textError}>USUARIO NO ENCONTRADO</Text>
                                        </View>
                                    )}
                                    
                                    {foundUser && !error && (
                                        <>  
                                            <View style={styles.messageAlert}>
                                                <MaterialCommunityIcons name="account-alert" size={50}/>
                                                <Text style={styles.importantText}>
                                                    Se deben cambiar los campos que se desean actualizar y los campos que no quiera actualizar, se deben dejar como estan
                                                </Text>
                                            </View>
                                            <Formik initialValues={{nombre: foundUser.nombre || '', 
                                                                    apellido: foundUser.apellido || '', 
                                                                    email: foundUser.email || '', 
                                                                    telefono: foundUser.telefono || '',
                                                                    direccion_ciudad: foundUser.direccion_ciudad || '', 
                                                                    direccion_calle: foundUser.direccion_calle || '' }}
                                                                validationSchema={UpdateSchema}
                                                                onSubmit={handleUpdate}>
                                                                    
                                                {({handleSubmit, isSubmitting, handleBlur, handleChange, values})=>(
                                                    <View style={styles.formContainer}>
                                                        <FormInput name="nombre" 
                                                            placeholder="Nombre del cliente" 
                                                            rightIcon={<MaterialCommunityIcons name="account" size={30} color={colors.thirdColor}/>}
                                                            style={styles.inputText}
                                                            onChange={handleChange('nombre')}
                                                            onBlur={handleBlur('nombre')}
                                                            value={values.nombre}
                                                            />
                                                        <FormInput name="apellido" 
                                                            placeholder="Apellido del cliente" 
                                                            rightIcon={<MaterialCommunityIcons name="tag" size={30} color={colors.thirdColor}/>}
                                                            style={styles.inputText}
                                                            onChange={handleChange('apellido')}
                                                            onBlur={handleBlur('apellido')}
                                                            value={values.apellido}
                                                            />
                                                        <FormInput name="email" 
                                                            placeholder="Correo del cliente" 
                                                            rightIcon={<MaterialCommunityIcons name="at" size={30} color={colors.thirdColor}/>}
                                                            style={styles.inputText}
                                                            onChange={handleChange('email')}
                                                            onBlur={handleBlur('email')}
                                                            value={values.email}/>
                                                        <FormInput name="telefono" 
                                                            placeholder="Numero de telefono del cliente" 
                                                            keyboardType="numeric"
                                                            rightIcon={<MaterialCommunityIcons name="cellphone" size={30} color={colors.thirdColor}/>}
                                                            style={styles.inputText}
                                                            onChange={handleChange('telefono')}
                                                            onBlur={handleBlur('telefono')}
                                                            value={values.telefono}/>
                                                        <FormInput name="direccion_ciudad" 
                                                            placeholder="Ciudad" 
                                                            rightIcon={<MaterialCommunityIcons name="map" size={30} color={colors.thirdColor}/>}
                                                            style={styles.inputText}
                                                            onChange={handleChange('direccion_ciudad')}
                                                            onBlur={handleBlur('direccion_ciudad')}
                                                            value={values.direccion_ciudad}/>
                                                        <FormInput name="direccion_calle" 
                                                            placeholder="Direccion del domicilio" 
                                                            rightIcon={<MaterialCommunityIcons name="home" size={30} color={colors.thirdColor}/>}
                                                            style={styles.inputText}
                                                            onChange={handleChange('direccion_calle')}
                                                            onBlur={handleBlur('direccion_calle')}
                                                            value={values.direccion_calle}/>
                                                        <TouchableOpacity onPress={() => handleSubmit()} 
                                                                            disabled={isUpdating}
                                                                            style={styles.button}>
                                                            <Text style={styles.buttonText}>
                                                                {isUpdating ? 'Actualizando...' : 'Actualizar'}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                )}
                                            </Formik>
                                        </>
                                    )}
                                </View>
                            )}
                    </Formik>
                </ScrollView>
            </KeyboardAvoidingView>
      )
}
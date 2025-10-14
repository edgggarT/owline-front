import { Formik, Field } from "formik";
import { View, Text, ScrollView, TouchableOpacity, KeyboardAvoidingView, Platform } from "react-native";
import Toast from "react-native-toast-message";
import { CreateSchema } from "../../hooks/CreateSchema";
import { API_URLS } from "../../constants/ApiConfig";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import FormInput from "../../components/FormInput/FormInput";
import { colors } from "../../styles/globalStyle";
import { styles } from "../../styles/create.style";
import axios from "axios";


export default function Create() {

    async function onSubmit(values, {resetForm}) {
        try {
            const response = await axios.post(`${API_URLS.BASE_URL}${API_URLS.CLIENTS}`, values)
            console.log(values)
            if (response) {
                Toast.show({
                    type: "success",
                    position: 'top',
                    text1: 'Cliente registrado con exito',
                    visibilityTime: 4000,
                })
                resetForm()
            } else {
                Toast.show({
                type: "error",
                position: 'top',
                text1: 'Error de regitro',
                visibilityTime: 4000,
                })
            }
        } catch (e) {
            console.error('Error: ', e)
        }
    }

    return (
        <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <ScrollView style={styles.scroll} contentContainerStyle={styles.container} keyboardShouldPersistTaps='handled'>
                <Formik initialValues={{ nombre: '', 
                                        apellido: '', 
                                        email: '', 
                                        telefono: '', 
                                        dni: '', 
                                        fecha_nacimiento: '', 
                                        direccion_ciudad: '', 
                                        direccion_calle: '' }}
                        validationSchema={CreateSchema}
                        onSubmit={onSubmit}>
                            
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
                                <FormInput name="dni" 
                                placeholder="DNI del cliente" 
                                keyboardType="numeric"
                                rightIcon={<MaterialCommunityIcons name="card-account-details" size={30} color={colors.thirdColor}/>}
                                style={styles.inputText}
                                onChange={handleChange('dni')}
                                onBlur={handleBlur('dni')}
                                value={values.dni}/>
                                <FormInput name="fecha_nacimiento" 
                                placeholder="Fecha de nacimiento" 
                                mode="date"
                                style={styles.inputText}
                                onChange={handleChange('fecha_nacimiento')}
                                onBlur={handleBlur('fecha_nacimiento')}/>
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
                                                disabled={isSubmitting}
                                                style={styles.button}>
                                    <Text style={styles.buttonText}>
                                        {isSubmitting ? 'Registrando...' : 'Registrar'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}
                </Formik>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
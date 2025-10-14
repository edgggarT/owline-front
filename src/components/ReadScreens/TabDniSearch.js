import { Formik, useFormikContext } from "formik";
import { useState } from "react";
import axios from "axios";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons';

import { dniSearchSchema } from "../../hooks/ReadSchema";
import FormInput from "../FormInput/FormInput";
import { colors } from "../../styles/globalStyle";
import { styles } from "../../styles/create.style";
import { UserGridDni } from "../UserGrid/UserGrid";
import { API_URLS } from "../../constants/ApiConfig";



export default function TabDniSearch() {

    const [foundUser, setFoundUser] = useState(null)
    const [error, setError] = useState(null)


  const onSubmit = async (values, {setSubmitting}) => {
        setFoundUser(null)
        setError(null)

        try {
            const dniSearch = values.dni
            const response = await axios.get(`${API_URLS.BASE_URL}${API_URLS.CLIENTSgetdni}`, {params: {dni: dniSearch}})
            const {data} = response
            if (data && data.dni) {
                setFoundUser(data)
                console.log("Usuario encontrado:", data)
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
          <ScrollView contentContainerStyle={styles.container} style={styles.scroll}>
            <Formik initialValues={{ 
                                    dni: ''
                                    }}
                    validationSchema={dniSearchSchema}
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
                            <UserGridDni 
                                nombre={foundUser.nombre} 
                                apellido={foundUser.apellido} 
                                telefono={foundUser.telefono} 
                                dni={foundUser.dni} 
                                email={foundUser.email} 
                                fecha_nacimiento={foundUser.fecha_nacimiento} 
                                direccion_ciudad={foundUser.direccion_ciudad} 
                                direccion_calle={foundUser.direccion_calle} 
                                fecha_registro={foundUser.fecha_registro}
                            />
                            )}

                        </View>
                    )}
            </Formik>
          </ScrollView>
      )
}
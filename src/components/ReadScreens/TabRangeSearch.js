import { Formik, useFormikContext } from "formik";
import { useState } from "react";
import axios from "axios";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import {MaterialCommunityIcons} from '@expo/vector-icons';

import { rangeSearchSchema } from "../../hooks/ReadSchema";
import FormInput from "../FormInput/FormInput";
import { colors } from "../../styles/globalStyle";
import { styles } from "../../styles/create.style";
import { UserGridRange } from "../UserGrid/UserGrid";
import { API_URLS } from "../../constants/ApiConfig";



export default function TabRangeSearch() {

    const [foundUser, setFoundUser] = useState(null)
    const [error, setError] = useState(null)


  const onSubmit = async (values, {setSubmitting}) => {
        setFoundUser(null)
        setError(null)

        try {
            const fechaInicial = values.fecha_inicial
            const fechaFinal = values.fecha_final
            console.log(fechaInicial)
            console.log(fechaFinal)
            const response = await axios.get(`${API_URLS.BASE_URL}${API_URLS.CLIENTSgetrange}`, {params: 
                                                                                  {fechaInicial: fechaInicial,
                                                                                   fechaFinal: fechaFinal}})
            const {data} = response
            if (data) {
                setFoundUser(data)
                console.log("Usuario encontrado:", data)
            } else {
                setError('Usuario no encontrado')
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
                                    fecha_inicial: '',
                                    fecha_final: ''
                                    }}
                    validationSchema={rangeSearchSchema}
                    onSubmit={onSubmit}>
                        
                    {({handleSubmit, isSubmitting, handleBlur, handleChange, values})=>(
                        <View style={styles.formContainer}>
                            
                            <FormInput name="fecha_inicial" 
                                       placeholder="Fecha Inicial" 
                                       mode="date"
                                       dateMode="initial"
                                       style={styles.inputText}
                                       onChange={handleChange('fecha_inicial')}
                                       onBlur={handleBlur('fecha_inicial')}/>
                            <FormInput name="fecha_final" 
                                       placeholder="Fecha Final" 
                                       mode="date"
                                       dateMode="final"
                                       style={styles.inputText}
                                       onChange={handleChange('fecha_final')}
                                       onBlur={handleBlur('fecha_final')}/>
                            
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
                                <View>
                                    <Text style={styles.text}>Se encontraron los siguientes resultados:</Text>
                                    {foundUser.map((cliente) => {
                                        return (
                                            <View key={cliente.dni}> 
                                                <UserGridRange  
                                                            nombre={cliente.nombre}
                                                            apellido={cliente.apellido}
                                                            dni={cliente.dni}
                                                            email={cliente.email}>
                                                </UserGridRange>
                                            </View>
                                        )
                                    })}
                                </View>
                            )}

                        </View>
                    )}
            </Formik>
          </ScrollView>
      )
}
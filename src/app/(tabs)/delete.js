import { Formik, useFormikContext } from "formik";
import { useState } from "react";
import axios from "axios";
import Toast from "react-native-toast-message";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { DeleteSchema } from "../../hooks/DeleteSchema";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import FormInput from "../../components/FormInput/FormInput";
import { API_URLS } from "../../constants/ApiConfig";
import { colors } from "../../styles/globalStyle";
import { styles } from "../../styles/delete.style";
import { UserGridDni } from "../../components/UserGrid/UserGrid";


export default function Delete() {

    const [foundUser, setFoundUser] = useState(null)
    const [error, setError] = useState(null)
    const [isDeleting, setIsDeleting] = useState(false)


    const handleDelete = (dni, name) => {
        Alert.alert('Confirmar Eliminacion', 
                    `¿Esta seguro de eliminar a ${name}?`, 
                    [{text: 'Cancelar', onPress:()=>console.log('Eliminacion cancelada'), style: 'cancel'},
                     {text: 'Eliminar', onPress:()=>onDelete(dni), style: "destructive"}])
    }

    const onDelete = async (dni) => {
        setIsDeleting(true)
        try {
            const deleteUser = await axios.delete(`${API_URLS.BASE_URL}${API_URLS.CLIENTS}`, {params: {dni: dni}})
            if (deleteUser.status === 200 || deleteUser.status === 204) {
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Eliminacion completada!'
                })
                console.log('El cliente fue eliminado')
                setFoundUser(null)
            } else {
                console.log('El dni no fue encontrado')
            }
            setIsDeleting(false)
        } catch (e) {
            console.log(`No se pudo elimanar el cliente: ${e}`)
        } finally {
            setIsDeleting(false)
        }
    }

  const onSubmit = async (values, {setSubmitting, resetForm}) => {
        setFoundUser(null)
        setError(null)

        try {
            const dniSearch = values.dni
            const response = await axios.get(`${API_URLS.BASE_URL}${API_URLS.CLIENTSgetdni}`, {params: {dni: dniSearch}})
            const {data} = response
            if (data && data.dni) {
                setFoundUser(data)
                console.log("Usuario encontrado:", data)
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
          <ScrollView style={styles.container}>
              <Formik initialValues={{ 
                                       dni: ''
                                       }}
                      validationSchema={DeleteSchema}
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
                              
                              {foundUser && (
                                <>
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
                                    <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(foundUser.dni, foundUser.nombre)}> 
                                        <MaterialCommunityIcons name="trash-can-outline" size={30} color={colors.secondaryColor}/>
                                    </TouchableOpacity>
                                </>
                              )}

                          </View>
                      )}
              </Formik>
          </ScrollView>
      )
}
import {View, FlatList, ScrollView} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { use, useEffect, useState, useCallback} from 'react'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { Text } from 'react-native-paper'
import { useLocalSearchParams } from 'expo-router'
import axios from 'axios'
import Toast from 'react-native-toast-message'
import styles from '../../styles/home.style'
import { API_URLS } from '../../constants/ApiConfig'
import { useFilterScreenChildren } from 'expo-router/build/layouts/withLayoutContext'

export default function Index() {

    const params = useLocalSearchParams()
    const [logs, setLogs] = useState(null)

    useEffect(() => {
        if (params.logued === 'true') {
            Toast.show({
                type: 'success',
                text1: 'Inicio de sesion exitoso!',
                position: 'top', 
                visibilityTime: 3000,
            });
        }
    }, [params.logued])


    useFocusEffect(
        useCallback(() => {
            let isActive = true;

            async function logsFunction() {
                try {
                    const response = await axios.get(`${API_URLS.BASE_URL}${API_URLS.LOGS}`)
                    console.log(response.data)
                    setLogs(response.data)
                } catch (e) {
                    console.log(`Error: ${e}`)
                }
            }
            logsFunction()

            return () => {
                isActive = false
            }
        }, [])
    )

    const Item = ({log}) => {
        const {accion, clientenombre, clienteapellido, fecha_accion, usuarioemail} = log;
        const nombreCompletoCliente = `${clientenombre} ${clienteapellido}`
        const fecha = fecha_accion;
        const tiempoLimpio = new Date(fecha).toLocaleTimeString('es-ES', {})
        const fechaLimpia = new Date(fecha).toLocaleDateString('es-ES', {})
        return (
            <>
                <Text style={styles.date}>
                    {`${fechaLimpia}`}
                </Text>
                <ScrollView horizontal={true} 
                            style={styles.scroll} 
                            scrollToOverflowEnabled={false} 
                            contentContainerStyle={styles.item}
                            showsHorizontalScrollIndicator={false}>
                    <Text style={styles.hora}>
                        {`(${tiempoLimpio})`}
                    </Text>
                    <Text style={styles.text}>
                        {`${usuarioemail}`}
                    </Text>
                    <Text style={styles.text}>
                        {`${accion}`}
                    </Text>
                    <Text style={styles.text}>
                        {`${nombreCompletoCliente}`}
                    </Text>
                </ScrollView>
            </>
        )
    }

    const renderItem = ({item}) => (
        <Item log={item}/>
    )

    return (
        <View style={styles.container}>
            <View style={styles.messageCont}>
                <MaterialCommunityIcons name='math-log' size={50}/>
                <Text style={styles.message}>
                    El archivo de registros o eventos esta conformado por la fecha, hora, email del administrador, la accion que realizo y el nombre del cliente en el cual impacta la accion.
                </Text>
            </View>
            {logs && (
                <FlatList data={logs} style={styles.list} renderItem={renderItem} keyExtractor={log => log.log_id.toString()}/>
            )}
        </View>
    )
}
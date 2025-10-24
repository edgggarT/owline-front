import {useEffect, useState} from 'react'
import { Alert } from 'react-native'
import axios from 'axios'
import { router } from 'expo-router'

import { API_URLS } from '../../constants/ApiConfig'
import { AuthContext, UserInfo, RegisterResult, AuthContextType} from '../../hooks/AuthContext'     // PARA CREAR COMPONENTE PROVIDER
import { saveAuthToken, loadAuthToken, removeAuthToken } from '../../hooks/AuthStorage'  // FUNCIONES QUE VALIDAN TOKEN


export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true);
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null)



    async function fetchUserInfo(token: string) {
        if (!token) return false;

        try {
            const response = await axios.get(`${API_URLS.BASE_URL}${API_URLS.PROFILE}`)
            const {name, email} = response.data
            setUserInfo({name, email})
        } catch (e) {
            console.error('Error al obtener datos del usuario: ', e.response?.status || e.message)

            if (e.response?.status === 401 || e.response?.status === 403 || e.response?.status === 422) {
                console.log('Token invalido/expirado detectado')
                await removeAuthToken()
                setAuthToken(null)
                setUserInfo(null)
            }
            return false;
        }
    }

    // ESTE EFFECT SE EJECUTA SIEMPRE AL INICIAR LA APLICACION, SOLO EN ESE MOMENTO
    useEffect(() => {
        async function cargarTokenApi() {
            try {
                const tokenAlmacenadoApi = await loadAuthToken();
                setAuthToken(tokenAlmacenadoApi)

                if (tokenAlmacenadoApi) {
                    await fetchUserInfo(tokenAlmacenadoApi)
                }
            } catch (e) {
                console.log('AsyncStorage no puedo acceder a la clave')
            } finally {
                setIsLoading(false)
            }
        };
        cargarTokenApi();
    }, []);

    const updateUserInfo = (newInfo: UserInfo) => {
        setUserInfo(newInfo)
    }

    async function login(email: string, password:string) {
        setIsLoading(true)
        try {
            const response = await axios.post(`${API_URLS.BASE_URL}${API_URLS.LOGIN}`, {
                email,
                password
            });

            if (response.data.token !== undefined) {
                const token = response.data.token;
                console.log(token)
                if (token) {
                    await saveAuthToken(token)
                    setAuthToken(token)
                    await fetchUserInfo(token)
                    setIsLoading(false)
                    router.replace({ pathname: '/', params: { logued: 'true' } })
                    return true;
                }
                setIsLoading(false)
                return true;
            } else {
                setIsLoading(false)
                return false
            }
        } catch (e) {
            console.error('error de autenticacion: ', e.response?.data || e.message)
            setIsLoading(false)
            throw e;
        }
    };

    async function logout() {
        await removeAuthToken()
        setAuthToken(null)
        setUserInfo(null)
        router.replace('/login')
    }

    async function register(name: string, email: string, password: string) {
        setIsLoading(true)
        try {
            const response = await axios.post(`${API_URLS.BASE_URL}${API_URLS.REGISTER}`, {
                name,
                email,
                password,
            })
            console.log(response.data)
            if (response.status === 200 || response.status === 201) {
                setIsLoading(false)    
                router.replace({ pathname: '/login', params: { registered: 'true' } })
                return {success: true} as RegisterResult
            }
            setIsLoading(false)
            return {success: true}
        } catch (e) {
            console.error('Error de registro en el backend: ', e.response?.data || e.message)
            
             if (axios.isAxiosError(e) && !e.response) {
                setIsLoading(false)
                Alert.alert('Error de conexion, verifique su conexion a internet')
                return {success: false, type: 'network'} as RegisterResult
            } else if (e.response && e.response.status === 409) {
                setIsLoading(false)
                return {success: false, type: 'conflict'} as RegisterResult
            } else {
                setIsLoading(false)
                Alert.alert('Error desconocido', 'Ocurrio un error inesperado')
                return {success: false, type: 'unknown'} as RegisterResult
            }
        }
    }


    const value = {
        authToken,
        isAuth: !!authToken,
        isLoading,
        userInfo,
        login,
        logout,
        updateUserInfo,
        register,

    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};








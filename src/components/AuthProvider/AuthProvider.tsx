import {useEffect, useState} from 'react'
import axios from 'axios'
import { router } from 'expo-router'



import { API_URLS } from '../../constants/ApiConfig'
import ApiClient from '../../constants/ApiClient'
import { AuthContext, UserInfo } from '../../hooks/AuthContext'     // PARA CREAR COMPONENTE PROVIDER
import { saveAuthToken, loadAuthToken, removeAuthToken } from '../../hooks/AuthStorage'  // FUNCIONES QUE VALIDAN TOKEN


export const AuthProvider = ({ children }) => {
    const [authToken, setAuthToken] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true);
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null)



    async function fetchUserInfo(token: string) {
        if (!token) return false;

        try {
            const response = await ApiClient.get(API_URLS.PROFILE)
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

    async function login(email, password) {
        setIsLoading(true)
        try {
            const response = await ApiClient.post(API_URLS.LOGIN, {
                email,
                password
            });

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
        } catch (e) {
            console.error('error de autenticacion: ', e.response?.data || e.message)
            setIsLoading(false)
            return false
        }
    };

    async function logout() {
        await removeAuthToken()
        setAuthToken(null)
        setUserInfo(null)
        router.replace('/login')
    }

    async function register(name, email, password) {
        setIsLoading(true)
        try {
            const response = await axios.post(`${API_URLS.BASE_URL}${API_URLS.REGISTER}`, {
                name,
                email,
                password,
            })
            setIsLoading(false)    
            router.replace({ pathname: '/login', params: { registered: 'true' } })
            return true
        } catch (e) {
            console.error('Error de registro en el backend: ', e.response?.data || e.message)
            return false
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








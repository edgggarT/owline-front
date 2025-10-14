import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'

import { AUTH_TOKEN_KEY } from '../constants/ApiConfig'



export async function saveAuthToken(token: string) {
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export async function loadAuthToken(): Promise<string | null> {
    const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY)

    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }
    return token
}

export async function removeAuthToken() {
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY)
    delete axios.defaults.headers.common['Authorization']
}




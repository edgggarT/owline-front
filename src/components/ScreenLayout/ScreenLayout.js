import {Stack, Redirect, useSegments, router} from 'expo-router'
import { useEffect } from 'react'
import { View, ActivityIndicator, Text } from 'react-native';
import { styles } from './ScreenLayout.style';
import { stylesProf } from '../../styles/profile.style';

import { useAuth } from '../../hooks/AuthContext';
import { colors } from '../../styles/globalStyle';
import SplashScreenComponent from '../SplashScreen/SplashScreen';

export default function ScreensLayoutLogic() {
    const {isAuth} = useAuth();
    const segment = useSegments();

    const route = segment[0] === 'login' || segment[0] === 'register'

    useEffect(() => {
        if (isAuth && route) {
            router.replace('/')
        } else if (!isAuth && !route) {
            router.replace('/login')
        }
    }, [isAuth, route]);


    return (
        <Stack>
            <Stack.Screen name='login' options={{ title: 'Login', headerShown: false}}/>
            <Stack.Screen name='(tabs)' options={{headerShown: false, gestureEnabled: false}}/> 
            <Stack.Screen name='profile' options={{title: 'Perfil', 
                                                   headerTitleStyle: stylesProf.title,
                                                   headerStyle: stylesProf.header
                                                  }}/>
            <Stack.Screen name='register' options={{title: 'Registrarse', 
                                                   headerTitleStyle: stylesProf.title,
                                                   headerStyle: stylesProf.header
                                                  }}/>
        </Stack>
    )
} 

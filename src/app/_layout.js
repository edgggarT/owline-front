import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen'
import Toast from 'react-native-toast-message';

import { MenuProvider } from 'react-native-popup-menu'
import { AuthProvider } from '../components/AuthProvider/AuthProvider'
import ScreensLayoutLogic from '../components/ScreenLayout/ScreenLayout'
import { fontStyle } from '../styles/globalStyle'
import SplashScreenComponent from '../components/SplashScreen/SplashScreen';
import { useEffect, useState } from 'react';
import { useAuth } from '../hooks/AuthContext';


function AppLoad() {
    const [fontsLoaded] = useFonts(fontStyle)
    const {isLoading: isAuthLoading} = useAuth();

    useEffect(() => {
        if (!fontsLoaded && !isAuthLoading) {
            SplashScreen.hideAsync()
        }
    }, [fontsLoaded, isAuthLoading])

    if (!fontsLoaded || isAuthLoading) {
        return (
            <SplashScreenComponent />
        )
    }

    return <ScreensLayoutLogic />
}


export default function RootLayout() {
    useEffect(() => {
        SplashScreen.preventAutoHideAsync();
    }, [])

    return (
        <MenuProvider>
            <AuthProvider>     
                <AppLoad />
            </AuthProvider>
            <Toast />
        </MenuProvider>
    )
} 
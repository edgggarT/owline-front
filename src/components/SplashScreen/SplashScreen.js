import React, {useEffect, useRef, useState,} from 'react'
import { View } from 'react-native'
import LottieView from 'lottie-react-native'
import Loading from '../../assets/Loading.json'
import {styles} from './SplashScreen.style'



export default function SplashScreenComponent() {
    return (
        <View style={styles.container}>
            <LottieView source={Loading} autoPlay loop={false} style={styles.lottie}/>
        </View>
    )
}


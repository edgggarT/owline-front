import React from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { router } from "expo-router";
import {Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu'
import { Text } from "react-native";


import { useAuth } from "../../hooks/AuthContext";
import {styles} from './UserMenu.style'


export const UserMenu = () => {

    const {logout} = useAuth()

    const deslogueo = () => {
        logout()
    }

    const profile = () => {
        router.push('/profile')
    }

    return (
        <Menu>

            <MenuTrigger style={styles.iconButton}>
                <MaterialCommunityIcons name="account-circle" size={50} color='#010101ff'></MaterialCommunityIcons>
            </MenuTrigger>

            <MenuOptions customStyles={{ optionsContainer: styles.menuOptions }}>
                <MenuOption onSelect={profile} style={styles.menuOption}>
                    <MaterialCommunityIcons name="account-cog" size={30} color='#010101ff'></MaterialCommunityIcons>
                    <Text style={styles.option}>Perfil</Text>
                </MenuOption>

                <MenuOption onSelect={deslogueo} style={styles.menuOption}>
                    <MaterialCommunityIcons name="logout" size={30} color='#010101ff'></MaterialCommunityIcons>
                    <Text style={styles.option}>Cerrar sesion</Text>
                </MenuOption>
            </MenuOptions>

        </Menu>
    )
}
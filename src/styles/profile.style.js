import { StyleSheet } from "react-native";

import { fonts, colors } from "./globalStyle";


export const stylesProf = StyleSheet.create({
    title: {
        fontSize: 30,
        fontFamily: fonts.mont500,
        color: colors.colorText
    },
    header: {
        backgroundColor: colors.backgroundColor
    }
}) 


export const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: colors.backgroundColor,
    },
    scroll: {
        flex: 1,
        backgroundColor: colors.backgroundColor
    },
    textTitle: {
        fontFamily: fonts.mont900,
        fontSize: 20,
        textAlign: 'center',
        marginTop: 20, 
    },
    textSub: {
        fontFamily: fonts.mont500,
        fontSize: 12,
        textAlign: 'center'
    },
    formContainer: {
        marginTop: 30,
        margin: 15,
        width: '100%'
    },
    label: {
        fontFamily: fonts.mont200,
        fontSize: 20,
        textAlign: 'left',
        paddingHorizontal: 10,
        
    },
    input: {
        fontFamily: fonts.mont500,
        fontSize: 15,
    },

    button: {
        height: 50,
        width: '100%',
        backgroundColor: colors.primaryColor,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        marginTop: 20,
    },

    buttonText: {
        fontFamily: fonts.mont500,
        fontSize: 15,
        color: colors.secondaryColor
    }
})
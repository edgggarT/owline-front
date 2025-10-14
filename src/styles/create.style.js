import { StyleSheet } from "react-native";
import { colors, fonts } from "./globalStyle";

export const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: 'center',
        padding: 10,
        backgroundColor: colors.backgroundColor
    },
    scroll: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
        marginBottom: 100, 
    },
    formContainer: {
        width: '100%',
        alignItems: 'center',
        padding: 10,
        marginVertical: 20,
    },
    inputText: {
        fontSize: 16,
        fontFamily: fonts.mont500
    },
    button: {
        flex: 1,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primaryColor,
        borderRadius: 10,
    },
    buttonText: {
        color: colors.secondaryColor,
        fontFamily: fonts.mont900,
        fontSize: 20,
        marginVertical: 10, 
    },
    textError: {
        color: colors.clearButton,
        fontSize: 20,
        fontFamily: fonts.mont900,
        textAlign: 'center'

    },
    containerError: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 40,
        flex: 1,
        width: '100%'
    },
    text: {
        color: colors.colorText,
        fontFamily: fonts.mont900,
        textAlign: 'center',
        fontSize: 14,
        marginTop: 30,
    }
    
})
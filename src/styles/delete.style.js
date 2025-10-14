import { StyleSheet } from "react-native";
import { colors, fonts } from "./globalStyle";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 100,
        backgroundColor: colors.backgroundColor
        
    },
    formContainer: {
        width: '100%',
        alignItems: 'center',
        padding: 20,
        marginVertical: 20,
    },
    inputText: {
        fontSize: 17,
        fontFamily: fonts.mont500
    },
    button: {
        flex: 1,
        width: '50%',
        backgroundColor: colors.primaryColor,
        justifyContent: 'center',
        alignItems: 'center',
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
    deleteButton: {
        flex: 1,
        width: '50%',
        padding: 10,
        backgroundColor: colors.clearButton,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    }
    
})
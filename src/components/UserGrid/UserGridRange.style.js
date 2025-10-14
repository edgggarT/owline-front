import { StyleSheet } from "react-native"
import { colors, fonts } from "../../styles/globalStyle"

export const stylesRange = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: colors.thirdColor,
        borderRadius: 15,
        marginVertical: 5,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        fontFamily: fonts.mont900
    },
    info: {
        borderWidth: 1,
        borderColor: colors.thirdColor,
        padding: 10,

    },
    infoKey: {
        fontSize: 20,
        fontFamily: fonts.mont500,
        color: colors.primaryColor,
        textDecorationLine: "underline",
        textAlign: 'center'
    },
    infoValue: {
        fontSize: 20,
        fontFamily: fonts.mont300,
        textAlign: 'center',
    }
})
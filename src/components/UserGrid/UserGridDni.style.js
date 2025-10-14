import { StyleSheet } from "react-native";
import { colors, fonts } from "../../styles/globalStyle";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 2,
        borderColor: colors.thirdColor,
        borderRadius: 15,
        width: '100%',
        marginVertical: 20,
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
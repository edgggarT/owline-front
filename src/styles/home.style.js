import { StyleSheet } from "react-native";
import { BaseToast } from "react-native-toast-message";
import { colors, fonts } from "./globalStyle";

const styles = StyleSheet.create({
    text: {
        fontSize: 10,
        margin: 10,
        fontFamily: fonts.mont500,
        color: colors.colorText,
        textAlign: 'center'
    },
    date: {
        marginHorizontal: 20,
        marginTop: 15,
        fontFamily: fonts.mont300
    },
    hora: {
        textAlign: 'center',
        fontSize: 10,
        margin: 10,
        fontFamily: fonts.mont900
    },
    container: {
        flex: 1,
        backgroundColor: colors.backgroundColor,
        borderWidth: 1,
    },
    list: {
        marginBottom: 120,
    },
    messageCont: {
        padding: 5,
        alignItems: 'center',
        borderWidth: 1,
        margin: 20,
    },
    message: {
        textAlign: 'center',
        fontFamily: fonts.mont500
    },
    item: {
        backgroundColor: '#fdffffff',
        marginVertical: 10,
        padding: 5,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: '#c7ededff',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    scroll: {
        margin: 10,
    },
    toastText: {
        color: colors.colorText,
        fontSize: 16,
        fontFamily: fonts.mont200,
    }
})

export default styles;
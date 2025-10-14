import { StyleSheet } from "react-native";
import { fonts, colors } from "../../styles/globalStyle";


export const styles = StyleSheet.create({
    iconButton: {
        marginRight: 10,
    },
    menuOptions: {
        marginTop: 50,
        marginRight: 5,
        borderRadius: 8,
        padding: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84
    },
    menuOption: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        elevation: 1,
    },
    option: {
        fontSize: 16,
        marginLeft: 10,
        color: colors.colorText,
        fontFamily: fonts.mont500
    }
})
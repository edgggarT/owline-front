import { StyleSheet } from "react-native";
import { colors, fonts } from "../../styles/globalStyle";

export const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.backgroundColor,
    },
    loadingText: {
        marginTop: 10,
        fontSize: 10,
        color: colors.colorText,
        fontFamily: fonts.mont500
    }
})
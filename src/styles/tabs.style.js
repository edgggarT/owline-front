import { StyleSheet } from "react-native";
import { colors, fonts } from "./globalStyle";


export const styles = StyleSheet.create({
    header: {
        backgroundColor: colors.primaryColor
    },

    headText: {
        fontFamily: fonts.mont500,
        fontSize: 30,
        marginTop: 7,
    },

    navBar: {
        backgroundColor: colors.primaryColor
    }
})


export const iconActive = colors.secondaryColor
export const iconInactive = colors.thirdColor
import { StyleSheet } from "react-native";
import { colors, fonts } from "../../styles/globalStyle";

export const styles = StyleSheet.create({
    tabBar: {
        flex: 1,
        position: 'absolute',
        bottom: 40,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.secondaryColor,
        borderRadius: 20,
        elevation: 4,
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: colors.backgroundColor
    },
    item: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
        margin: 10
    }
})
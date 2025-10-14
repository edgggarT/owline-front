import { StyleSheet } from "react-native";
import { colors, fonts } from "./globalStyle";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.backgroundColor,
  },
  subtext: {
    marginTop: 40,
    fontFamily: fonts.mont500,
    textAlign: 'center',
    color: colors.colorText,
    marginBottom: 60,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
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
    color: colors.secondaryColor,
    fontSize: 18,
    fontFamily: fonts.mont900,
  },
  inputText: {
    fontSize: 17,
    fontFamily: fonts.mont500
  },
  containerCheckMap: {
    flexDirection: 'row',
    justifyContent: "flex-start",
    width: '100%',
    padding: 2
  },

  text: {
    fontFamily: fonts.mont500,
    marginLeft: 15,
    marginRight: 8,
  }
})
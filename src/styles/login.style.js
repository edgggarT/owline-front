import { StyleSheet } from "react-native";
import { fonts, colors } from "./globalStyle";
import { color } from "react-native-elements/dist/helpers";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: colors.backgroundColor,
  },
  scroll: {
    flex: 1,
    backgroundColor: colors.backgroundColor
  },
  title: {
    fontSize: 50,
    fontFamily: fonts.mont200,
    marginBottom: 50,
    color: colors.colorText,
  },
  subtext: {
    marginTop: 40,
    fontFamily: fonts.mont500,
    textAlign: 'center',
    color: colors.colorText
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
    marginTop: 2,
  },
  buttonText: {
    color: colors.secondaryColor,
    fontSize: 18,
    fontFamily: fonts.mont900,
  },
  inputText: {
    fontSize: 17,
    fontFamily: fonts.mont500
  }
});

export default styles;
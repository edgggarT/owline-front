import { StyleSheet } from "react-native";
import { colors, fonts } from "../../styles/globalStyle";

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 15,
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    elevation: 6,
  },
  errorInput: {
    borderColor: '#ff3333', // Borde rojo si hay un error
  },
  errorText: {
    color: '#ff3333',
    marginTop: 5,
    fontSize: 12,
  },
  placeholder: {
    fontFamily: fonts.mont500,
    fontSize: 17,
    color: colors.thirdColor
  },
  dateValue: {
    fontFamily: fonts.mont500,
    fontSize: 17,
    textAlign: 'center',
    color: colors.colorText
  },
  restartDate: {
    backgroundColor: colors.clearButton,
    width: '45%',
    borderRadius: 20
  },
  selectDate: {
    backgroundColor: colors.calendarButton,
    width: '45%',
    borderRadius: 20
  },
  textButtonsDate: {
    color: colors.secondaryColor,
    fontFamily: fonts.mont500,
    textAlign: 'center',
    padding: 4,
  },
  containerButtons: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    justifyContent: 'space-evenly',
    marginTop: 10,
  }
});

export default styles;
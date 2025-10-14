import { View, TextInput, Text, TouchableOpacity} from 'react-native'
import { Button, Input, InputProps } from 'react-native-elements'
import { useField, useFormikContext } from "formik"
import { useState , useRef} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform, Pressable } from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons'
import styles from "./FormInput.style"
import { colors } from '../../styles/globalStyle';

type InputMode = 'text' | 'date' 
type DateMode = 'initial' | 'final' | null

interface FormInputProp extends InputProps{
    name: string,
    placeholder: string,
    secureTextEntry?: boolean,
    icon: string,
    mode?: InputMode
    dateMode?: DateMode
}

export default function FormInput({ name, placeholder, mode='text', dateMode=null,...props }: FormInputProp) {
    
    const formik = useFormikContext()
    const [field, meta] = useField(name);
    const [showDatePicker, setShowDatePicker] = useState(false)

    const hasError = meta.touched && meta.error;

    const handleDateChange = (event: any, selectedDate?: Date) => {
        setShowDatePicker(Platform.OS === 'ios');
        if (selectedDate) { 
            const dateToSave = new Date(selectedDate)

            if (dateMode === 'initial') {
                dateToSave.setUTCHours(0,0,0,0)
            } else if (dateMode === 'final') {
                dateToSave.setUTCHours(23,59,59,999)
            } else {
                dateToSave.setUTCHours(0,0,0,0)
            }

            formik.setFieldValue(field.name, dateToSave.toISOString());
            formik.setFieldTouched(field.name, true)
        }
    }

    const clearDate = () => {
        formik.setFieldValue(field.name, null)
        formik.setFieldTouched(field.name, null)
    }


    const displayValue = () => {
        if (mode === 'date' && field.value) {
            const dateValue = field.value instanceof Date ? field.value : new Date(field.value);
            return dateValue.toLocaleDateString('es-ES', {day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC'});
        }
        return field.value;
    }

    return (
        <View style={styles.container}>

            {mode === 'date' ? (
                <>
                    <Input  
                        containerStyle={[styles.input, hasError && styles.errorInput]} 
                        id={name}
                        placeholder={placeholder}
                        editable={false}
                        value={(field.value ? displayValue() : '')}
                        {...props}>
                    </Input>
                    <View style={styles.containerButtons}>
                        <TouchableOpacity style={styles.restartDate}
                                          onPress={clearDate}>
                            <MaterialCommunityIcons name="delete" 
                                                    size={30} 
                                                    olor={colors.secondaryColor}
                                                    style={styles.textButtonsDate}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.selectDate}
                                          onPress={() => setShowDatePicker(true)}>
                            <MaterialCommunityIcons name="calendar" 
                                                    size={30} 
                                                    color={colors.secondaryColor}
                                                    style={styles.textButtonsDate}/>
                        </TouchableOpacity>
                    </View>
                </>

            ) : (

            <Input placeholder={placeholder} 
                       value={displayValue()}
                       onChangeText={field.onChange(field.name)}
                       onBlur={field.onBlur(field.name)}
                       autoCapitalize="none"
                       containerStyle={[styles.input, hasError && styles.errorInput]}
                       {...props}>  
            </Input>

            )}

            {showDatePicker && (
                <DateTimePicker value={field.value ? new Date(displayValue()) : new Date()}
                                mode='date'
                                display='default'
                                onChange={handleDateChange}
                                maximumDate={new Date()}/>
            )}

            {hasError ? (
                <Text style={styles.errorText}>{meta.error}</Text>
            ): null}

        </View>
    )
} 

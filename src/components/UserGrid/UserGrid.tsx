import React from "react";
import { View, Text } from "react-native";
import { styles } from "./UserGridDni.style";
import { stylesRange } from "./UserGridRange.style";


export const UserGridDni = ({nombre, apellido, telefono, dni, email, fecha_nacimiento, direccion_ciudad, direccion_calle, fecha_registro}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Resultados de la busqueda:</Text>

            <View style={styles.info}>
                <Text style={styles.infoKey}>Nombre del cliente</Text>
                <Text style={styles.infoValue}>{nombre}</Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.infoKey}>Apellido del cliente</Text>
                <Text style={styles.infoValue}>{apellido}</Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.infoKey}>Telefono del cliente</Text>
                <Text style={styles.infoValue}>{telefono}</Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.infoKey}>DNI del cliente</Text>
                <Text style={styles.infoValue}>{dni}</Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.infoKey}>Correo electronico del cliente</Text>
                <Text style={styles.infoValue}>{email}</Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.infoKey}>Fecha de nacimiento del cliente</Text>
                <Text style={styles.infoValue}>{fecha_nacimiento}</Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.infoKey}>Ciudad del cliente</Text>
                <Text style={styles.infoValue}>{direccion_ciudad}</Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.infoKey}>Direccion del cliente</Text>
                <Text style={styles.infoValue}>{direccion_calle}</Text>
            </View>
            <View style={styles.info}>
                <Text style={styles.infoKey}>Fecha de registracion</Text>
                <Text style={styles.infoValue}>{fecha_registro}</Text>
            </View>
        </View>
    )
}


export const UserGridRange = ({nombre, apellido, dni, email,}) => {
    return (
        <View style={stylesRange.container}>

            <View style={stylesRange.info}>
                <Text style={stylesRange.infoKey}>Nombre del cliente</Text>
                <Text style={stylesRange.infoValue}>{nombre}</Text>
            </View>
            <View style={stylesRange.info}>
                <Text style={stylesRange.infoKey}>Apellido del cliente</Text>
                <Text style={stylesRange.infoValue}>{apellido}</Text>
            </View>
            <View style={stylesRange.info}>
                <Text style={stylesRange.infoKey}>DNI del cliente</Text>
                <Text style={stylesRange.infoValue}>{dni}</Text>
            </View>
            <View style={stylesRange.info}>
                <Text style={stylesRange.infoKey}>Correo electronico del cliente</Text>
                <Text style={stylesRange.infoValue}>{email}</Text>
            </View>
        </View>
    )
}

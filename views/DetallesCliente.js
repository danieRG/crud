import React  from 'react'
import { View, StyleSheet, Alert } from 'react-native'
import {Headline, Text, Subheading, Button, FAB} from 'react-native-paper'
import globalStyles from '../styles/global'
import axios from 'axios'

const DetallesCliente = ({route, navigation}) =>{

    const {setConsultarAPI} = route.params;
const {nombre, telefono, correo, empresa, id} =route.params.item;
const mostrarConfirma = () => {
    Alert.alert(
        '¿Deseas eliminar ester cliente?',
        'Un contacto eliminado no se puede recuperar',
        [
            {text:'Cancelar', style:'cancel'},
            {Text:'Si, eliminar',  onPress: () => eliminarContacto()}
        ]
    )
}

const eliminarContacto = async () =>{

    url=`http://10.0.2.2:3000/clientes/${id}`
    try {
        await axios.delete(url)
        
    } catch (error) {
        console.log(error)
    }

    //rediredccion
    navigation.navigate('Inicio');

    //consultar api nuevamente
    setConsultarAPI(true)

}
    return(
        <View style={globalStyles.contenedor}>
            <Headline style={globalStyles.titulo}>{nombre}</Headline>
            <Text style={styles.texto}>Empresa: <Subheading>{empresa}</Subheading></Text>
            <Text style={styles.texto}>Correo: <Subheading>{correo}</Subheading></Text>
            <Text style={styles.texto}>Telefono: <Subheading>{telefono}</Subheading></Text>

            <Button 
            mode="contained" 
            icon="cancel" 
            style={styles.boton}
            onPress={() => mostrarConfirma()}
            >Eliminar cliente</Button>

            <FAB 
                icon="pencil"
                style={globalStyles.fab}
                onPress={() => navigation.navigate("NuevoCliente", {cliente: route.params.item, setConsultarAPI})}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    texto:{
        marginBottom:20,
        fontSize:18
    },
    boton:{
        marginTop:100,
        backgroundColor:'red'
    }
})

export default DetallesCliente;

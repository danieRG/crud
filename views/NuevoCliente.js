import React, {useState, useEffect}  from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { TextInput, Headline, Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import globalStyles from '../styles/global';
import axios from 'axios';

const NuevoCliente = ({navigation, route}) =>{

    const { setConsultarAPI, cliente } = route.params;

    const [nombre, setNombre] = useState('')
    const [telefono, setTelefono] = useState('')
    const [correo, setCorreo] = useState('')
    const [empresa, setEmpresa] = useState('')
    const [alerta, setAlerta] = useState(false)

    useEffect(() => {
        if(route.params.cliente){
            const {nombre, telefono, correo, empresa} = route.params.cliente
            setNombre(nombre)
            setTelefono(telefono)
            setCorreo(correo)
            setEmpresa(empresa)
        }else{

        }

    }, [])


    const guardarCliente = async () => {
        //validar
        if(nombre==='' || telefono==='' || correo==='' || empresa===''){
            setAlerta(true)
            return;
        }
        //generar cliente
        const cliente = { nombre, telefono, empresa, correo }
        //si estamos editando o creando un nuevo cliente
        if(route.params.cliente){
            const {id} = route.params.cliente;
            cliente.id = id;
            const url=`http://10.0.2.2:3000/clientes/${id}`;
            try {
                
                await axios.put(url, cliente)

            } catch (error) {
                console.log(error)
            }

        }else{
            try { 
                if(Platform.OS === 'ios'){
                    await axios.post('http://localhost:3000/clientes', cliente)
                }else{
                    await axios.post('http://10.0.2.2:3000/clientes', cliente)
                }
    
            } catch (error) {
                console.log(error)
                
            }
        }

        //redireccionar
        navigation.navigate('Inicio')
        //limpiar form
        setNombre('')
        setTelefono('')
        setCorreo('')
        setEmpresa('')

        //cambiar a true
        setConsultarAPI(true)

    }

    const mostrarAlert = () => {

    }
    
    return(
        <View style={globalStyles.contenedor}>
            <Headline style={globalStyles.titulo}>Añadir nuevo cliente</Headline>
            <TextInput
                style={styles.input} 
                label="Nombre"
                placeholder="Daniel"
                onChangeText={(texto) => setNombre(texto)}
                value={nombre}
            />
            <TextInput
                style={styles.input} 
                label="Teléfono"
                placeholder="963122545"
                onChangeText={(texto) => setTelefono(texto)}
                value={telefono}
            />
            <TextInput
                style={styles.input} 
                label="Correo"
                placeholder="correo@correo.com"
                onChangeText={(texto) => setCorreo(texto)}
                value={correo}
            />
            <TextInput
                style={styles.input} 
                label="Empresa"
                placeholder="Nombre empresa"
                onChangeText={(texto) => setEmpresa(texto)}
                value={empresa}
            />
            <Button icon='pencil-circle' mode="contained" onPress={() => guardarCliente()}>
                Guardar cliente
            </Button>
            <Portal>
                <Dialog
                    visible={alerta}
                    onDismiss={ () => setAlerta(false)}
                >
                    <Dialog.Title>Error</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Todos los campos son requeridos</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => setAlerta(false)}>OK</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    )
}

const styles = StyleSheet.create({
    input:{
        marginBottom:20,
        backgroundColor:'transparent'
    }
})

export default NuevoCliente;

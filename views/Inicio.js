import React, {useState,useEffect}  from 'react'
import { Text, Platform, FlatList, View } from 'react-native'
import axios from 'axios';
import {List, Headline, Button, FAB} from 'react-native-paper'
import globalStyles from '../styles/global'

const Inicio = ({navigation}) =>{
    const [clientes, setClientes] = useState([])
    const [consultarAPI, setConsultarAPI] = useState(true)

    useEffect(() => {
        const obtenerClientesApi = async () => {
            try {
                const resultado = await axios.get('http://10.0.2.2:3000/clientes')
                setClientes(resultado.data)
                setConsultarAPI(false)
            } catch (error) {
                console.log(error)
            }
        }
        if(consultarAPI){
            obtenerClientesApi();
        }
        
    }, [consultarAPI])

    return(
        <View style={globalStyles.contenedor}>
            <Button icon="plus-circle" onPress={() => navigation.navigate("NuevoCliente", {setConsultarAPI})}>
                Nuevo Cliente
            </Button>
            <Headline style={globalStyles.titulo}>
                {clientes.length > 0 ? 'Clientes' : 'Aún no hay clientes'}
            </Headline>
            <FlatList 
                data={clientes}
                keyExtractor={cliente => (cliente.id).toString()}
                renderItem={({item}) => (
                    <List.Item 
                        title={item.nombre}
                        description={item.empresa}
                        onPress={() => navigation.navigate("DetallesCliente", {item, setConsultarAPI})}
                    />
                )}
            />
            <FAB 
                icon="plus"
                style={globalStyles.fab}
                onPress={() => navigation.navigate("NuevoCliente", {setConsultarAPI})}
            />

        </View>
    )
}


export default Inicio;

import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

import api from './src/services/api';

export default function App(){

  const [cep, setCep] = useState(null);


  async function buscar(){
    const response =  await api.get(cep + '/json/?callback=meu_callback').catch(err=>err);
    console.log(response.data);
  }


  return(
    <View style={styles.container}>
        <Text style={styles.titulo}> Digite o Cep desejado</Text>

       {/* View onde vai ficar parte de buscar Cep*/}
      <View style={styles.areaBusca}>
          <TextInput onChange={(valor)=> setCep(valor)} placeholder='Ex: 79003144' keyboardType='numeric' style={styles.input}></TextInput>
          <View style={styles.areaBtn}>
          <TouchableOpacity style={[styles.btn, {backgroundColor: 'blue'} ] } onPress={buscar}>
            <Text style={{color: '#fff'}}>Buscar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, {backgroundColor: '#f15500'} ]}>
            <Text style={{color: '#fff'}}>Limpar</Text>
          </TouchableOpacity>
          </View>
      </View>

      {/* {cep !== null &&( */}
        <View style={styles.areaResultado}>
            <Text style={styles.txtResultado}>Endereço: </Text>
            <Text style={styles.txtResultado}>Complemento: </Text>
            <Text style={styles.txtResultado}>Localidade: </Text>
            <Text style={styles.txtResultado}>UF: </Text>
        </View>

      {/* )} */}
      




    </View>
  );
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: 'white',
  },
  titulo:{
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 30,
      marginTop: 10,
      
  },


  areaBusca:{
    margin: 10,
    borderRadius: 8,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    shadowRadius: 1.0,
    height: 170, 
    
  },

  input:{

    borderColor: '#000',
    borderRadius: 5,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    margin:10,
    paddingLeft: 10,
    height: 50,

  },

  areaBtn:{
    flexDirection: 'row',
  },

  btn:{
    justifyContent: 'flex-start',
    margin: 60,
    marginTop: 10,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderRadius: 8,
    padding: 15
  },

  areaResultado:{
    backgroundColor: '#eef2fb',
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 8,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    shadowRadius: 1.0,
    height: 200,
    padding: 10,
    alignItems: 'center'

  },

  txtResultado:{
    color: 'black',
    fontSize: 15,
    margin: 10,
    fontWeight: 'bold'
      
  }
})
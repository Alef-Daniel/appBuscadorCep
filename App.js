import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard } from 'react-native'

import api from './src/services/api';

export default function App(){

  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [complemento, setComplemento] = useState('');
  const [localidade, setLocalidade] = useState('');
  const [uf, setUf] = useState('');
  const[view, setView] = useState(false);

  async function buscar(){
    const response =  await api.get(`${cep}/json`);
    setEndereco(response.data.logradouro);
    setComplemento(response.data.complemento);
    setLocalidade(response.data.localidade);
    setUf(response.data.uf);
    setView(true);
    Keyboard.dismiss();
    this.textInput.clear();

  }

  function limpar(){
    
    setEndereco('');
    setComplemento('');
    setLocalidade('');
    setUf('');
    setView(false);
    
    
  }


  return(
    <View style={styles.container}>
        <Text style={styles.titulo}> Digite o Cep desejado</Text>

       {/* View onde vai ficar parte de buscar Cep*/}
      <View style={styles.areaBusca}>
          <TextInput  ref={input => { this.textInput = input }} onChangeText={(cep)=> setCep(cep)} placeholder='Ex: 79003144' keyboardType='numeric' style={styles.input}></TextInput>
          <View style={styles.areaBtn}>
          <TouchableOpacity style={[styles.btn, {backgroundColor: 'blue'} ] } onPress={buscar}>
            <Text style={{color: '#fff'}}>Buscar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btn, {backgroundColor: '#f15500'} ]} onPress={limpar}>
            <Text style={{color: '#fff'}}>Limpar</Text>
          </TouchableOpacity>
          </View>
      </View>

       {view !== false &&(
        <View style={styles.areaResultado}>
            <Text style={styles.txtResultado}>Endereço: {endereco} </Text>
            <Text style={styles.txtResultado}>Complemento: {complemento} </Text>
            <Text style={styles.txtResultado}>Localidade: {localidade}</Text>
            <Text style={styles.txtResultado}>UF: {uf}</Text>
        </View>

       )}
      




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
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Keyboard, Alert } from 'react-native'

import api from './src/services/api';

export default function App(){

  const [cep, setCep] = useState('');
  const[userCep, setUserCep]=useState(null);
  const[view, setView] = useState(false);

  async function buscar(){
   
    if(cep===''){
      Alert("Digite um cep válido");
      setCep('');
      return;
    }
   
   
   try{
    const response =  await api.get(`${cep}/json`);
    setUserCep(response.data);
    setView(true);
    Keyboard.dismiss();
    this.textInput.clear();
    }catch(error){

        if(error !== null){
          alert("Cep não encontrado");
          return;
        }
    }
   }

  function limpar(){
    
   setUserCep(null);
    setView(false);
    this.textInput.clear();
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
            <Text style={styles.txtResultado}>Endereço: {userCep.logradouro} </Text>
            <Text style={styles.txtResultado}>Complemento: {userCep.complemento} </Text>
            <Text style={styles.txtResultado}>Localidade: {userCep.localidade}</Text>
            <Text style={styles.txtResultado}>UF: {userCep.uf}</Text>
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
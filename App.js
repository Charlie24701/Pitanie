import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';  
import { StyleSheet, Text, View, Button, RefreshControl } from 'react-native';
import styled from 'styled-components/native'
import { Navigator } from './navigator.js';
import * as SecureStore from 'expo-secure-store';
import { HumanForm } from './screens/humanForm.js';
import { HOST } from './screens/settings.js';

export default function App() {
  const [Active, setActive] = useState('')
  
  const setActiveToggle = () => {
    setActive('true')
}

async function User() {
  const name = await SecureStore.getItemAsync('UserName');

  try {
    const requestOptions =
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "name": name,
      }),
    }

    const response = await fetch(HOST + '/check_user_auth', requestOptions);
    const data = await response.json();
    if (data.message == '1') {
      setActive('true')
    } else {setActive('false')}

  } catch (error) {
    console.log(error)
  }
}
  
  useEffect(() => {User()}, [])


  if (Active == 'true') {
    return (
      <Navigator />
    )
  }
  if (Active == 'false') {
    return (
      <HumanForm setToggle={setActiveToggle}/>
    )
  }
  
    return (
      <View style={{alignContent: 'center', justifyContent: 'center', width: '100%', height: '100%'}}>
        <Text style={{alignContent: 'center', justifyContent: 'center', textAlign: 'center', fontSize: 25}}>
        Добро пожаловать
        </Text>
        <Text style={{alignContent: 'center', justifyContent: 'center', textAlign: 'center', fontSize: 18}}>
        Загрузка...
        </Text>
      </View>
      
  );
}

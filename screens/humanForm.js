import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  Image,
  Button
} from 'react-native';
import styled from 'styled-components/native'
import { Header } from './components/header';
import * as SecureStore from 'expo-secure-store';
import { Dropdown } from 'react-native-element-dropdown';
import { HOST } from './settings.js';

const Main = styled.View`
    flex-direction: column;
    position: absolute;
    justify-content: center;
    height: 100%;
    width: 100%;
    padding-right: 20%;
    padding-left: 20%;
`
const EnterContainer = styled.View`
    flex-direction: row;
    justify-content: space-between;
    width: 100%

`
const Apply = styled.TouchableOpacity`
      height: 50px;
      flex: 2;
      background-color: #00ff7f;
      border-radius: 20px;
      align-items: center;
      justify-content: center;
`
const Exit = styled.TouchableOpacity`
      height: 50px;
      flex:1;
      background-color: #A6A6A6;
      
      border-radius: 20px;
      align-items: center;
      justify-content: center;
      margin-right: 5px;
`
const EnterBox = styled.View`
    min-width: 45%
`
const Buttoms = styled.View`
    flex-direction: row;
    margin-top: 10px;
    justify-content: space-between;
`
const Hello = styled.View`
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
`
const UserImput = styled.TextInput`
    padding-left: 20px;
    padding-right:20px;
    height: 40px;
    borderTopLeftRadius: 20px;
    borderTopRightRadius: 20px;
    borderBottomLeftRadius: 20px;
    borderBottomRightRadius: 20px;
    background-color: #FF7575;
    color: white;
`



export const HumanForm = ({ setToggle, navigation, Show, setShow, exit = false }) => {
  const [weight, SetWeight] = useState('')
  const [height, SetHeight] = useState('') // Переменная, которая хранит набранный текст в поле ввода сообщения
  const [diet, SetDiet] = useState('0') // Переменная, которая хранит набранный текст в поле ввода сообщения
  const [name, SetName] = useState('') // Переменная, которая хранит набранный текст в поле ввода сообщения
  const [activity, SetActivity] = useState('1') // Переменная, которая хранит набранный текст в поле ввода сообщения
  const [old, SetOld] = useState('') // Переменная, которая хранит набранный текст в поле ввода сообщения
  const [sex, SetSex] = useState('') // Переменная, которая хранит набранный текст в поле ввода сообщения
  const [myDiet, SetMyDiet] = useState('Нет диеты') // Переменная, которая хранит набранный текст в поле ввода сообщения

  const isWhitespaceString = str => !str.replace(/\s/g, '').length


  const trans = async (name, sex) => {
    name = name.trimStart().trimEnd()
    if (sex != 'м' && sex != 'ж') {
      alert('Выберите пол!');
      return;
    }
    if (isWhitespaceString(name)) {
      alert('Имя не может быть пустым!');
      return;
    }
    if (name.length < 3) {
      alert('Имя должно быть больше 3 букв!');
      return;
    }

    try {
      await SecureStore.setItemAsync('UserName', name);
      await SecureStore.setItemAsync('Diet', myDiet);
      await SecureStore.setItemAsync('Active', 'true');
      SetName('')
      if (setToggle != undefined) {
        setToggle();
        console.log('FirstAuthorization')
      } else {
        setShow()
      }
      SetUser(height, weight, sex, old, activity, diet)
    } catch (error) {
      alert('Заполните все поля!');
      console.log(error, typeof(sex))
    }
  };

  const UserExist = async () => {
    try {
      user = await SecureStore.getItemAsync('UserName');
      userSex = await SecureStore.getItemAsync('UserSex');
      if (user != undefined && userSex != undefined) {
        SetName(user);
        SetSex(userSex);

      }
    } catch (error) {
      console.log(error)
    }
  };

  async function SetUser(height, weight, sex, old, activity, diet) {
    user = await SecureStore.getItemAsync('UserName');
    hei = parseInt(height)
    wei = parseInt(weight)
    age = parseInt(old)
    active = parseInt(activity)

    try {
      const requestOptions =
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "name": user,
          "height": hei,
          "weight": wei,
          "gender": sex,
          "age": age,
          "activity": active,
          "diet": diet
        }),
      }

      const response = await fetch(HOST + '/set_user_data', requestOptions);
      const data = await response.json();

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {UserExist()}, [Show])


  
  return (
    <Modal visible={Show}>

      <Main>
        {!exit ? <Hello>
          <Text style={{ textAlign: 'center', fontSize: 25, marginBottom: 10 }}>Добро пожаловать!</Text>
          <Text>Введите необходимые данные для продолжения</Text>
        </Hello> : <Text style={{ textAlign: 'center', fontSize: 25, marginBottom: 10 }}>Заполните форму</Text>
        }
    
        {!exit ? 
        <EnterContainer>
        <EnterBox style={{width: '60%'}}>
          <Text>Ваше имя:</Text>
          <UserImput style={{ marginBottom: 10 }}
            maxLength={10}
            onChangeText={(name) => SetName(name)}
            value={name}
          />
        </EnterBox>
        
        <EnterBox style={{minWidth: '30%'}}>
            <Text>Пол:</Text>
            
            <Dropdown style={{backgroundColor: '#FF7575', 
            borderRadius: 20,
            
            fontSize: 14,
            minHeight: 40,
            paddingLeft: 20,
            paddingRight: 10,
          }}
            data={[{ label: 'М', value: 'м' },
              { label: 'Ж', value: 'ж' },
              ]}
              iconColor='white'
              selectedTextStyle={{fontSize: 14, color: 'white'}}
              placeholderStyle={{fontSize: 14, color: 'white'}}  
              activeColor='#FF7575'
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder=""
              value={sex}
              onChange={item => {
                SetSex(item.value);
              }}
              />
              
          </EnterBox>
        </EnterContainer>
         : <View />
        }


        <EnterContainer>
          <EnterBox>
            <Text>Ваш возраст:</Text>
            <UserImput
              onChangeText={(old) => SetOld(old)}
              keyboardType='numeric'
              contextMenuHidden={true}
              maxLength={3}
              value={old}
            />
          </EnterBox>

          <EnterBox>
            <Text>Ваш вес:</Text>
            <UserImput keyboardType='numeric'
              contextMenuHidden={true}
              maxLength={3}
              onChangeText={(weight) => SetWeight(weight)}
              value={weight}
            />
          </EnterBox>

        </EnterContainer>

        <EnterContainer>

          <EnterBox>
            <Text>Ваш рост:</Text>
            <UserImput
              onChangeText={(height) => SetHeight(height)}
              value={height}
              keyboardType='numeric'
              contextMenuHidden={true}
              maxLength={3}
            />
          </EnterBox>
          <EnterBox style={{width: '45%'}}>
            <Text>Активность:</Text>
            
            <Dropdown style={{backgroundColor: '#FF7575', 
            borderRadius: 20,
            fontSize: 14,
            minHeight: 40,
            minWidth: 100,
            paddingLeft: 20,
            paddingRight: 10,
          }}
            data={[{ label: '1', value: '1' },
              { label: '2', value: '2' },
              { label: '3', value: '3' },
              { label: '4', value: '4' },
              { label: '5', value: '5' }]}
              iconColor='white'
              selectedTextStyle={{fontSize: 14, color: 'white'}}
              placeholderStyle={{fontSize: 14, color: 'white'}}  
              activeColor='#FF7575'
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder=""
              value={activity}
              onChange={item => {
                SetActivity(item.value);
              }}
              />
              <Text style={{fontSize: 12, color: 'gray', flexWrap: 'wrap'}}>Оцените вашу активность</Text>
              
          </EnterBox>
          
        </EnterContainer>
        <EnterBox>
            <Text>Ваша диета:</Text>
            <Dropdown style={{backgroundColor: '#FF7575', 
            borderRadius: 20,
            fontSize: 14,
            minHeight: 40,
            minWidth: 100,
            paddingLeft: 20,
            paddingRight: 10,
          }}
            
            data={[{ label: 'Нет диеты', value: '0' },
              { label: 'Снижение веса', value: '1' },
              ]}
              iconColor='white'
              selectedTextStyle={{fontSize: 14, color: 'white'}}
              placeholderStyle={{fontSize: 14, color: 'white'}}  
              activeColor='#FF7575'
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Ваша диета"
              value={diet}
              onChange={(item) => {
                SetDiet(item.value);
                SetMyDiet(item.label);
              }}
              />
          </EnterBox>

        <Buttoms>
          {exit ? <Exit onPress={() => setShow()}><Text style={{color: 'white'}}>Выход</Text></Exit> : <View />}

          <Apply onPress={() => {
            trans(name, sex)
            
            
          }}>
            <Text style={{color: 'white'}}>Подтвердить</Text>
          </Apply>

        </Buttoms >


      </Main>
    </Modal>


  )
}
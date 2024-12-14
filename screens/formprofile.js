import React, { useEffect, useState } from 'react';  
import {
    ScrollView,
    RefreshControl,
    Text, 
    View,
    TouchableOpacity,
    TextInput,
    Image,
} from 'react-native'; 
import styled from 'styled-components/native'
import { Header } from './components/header';
import { Dish } from './components/dish';
import { useIsFocused } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { HOST } from './settings.js';


const Main = styled.View`
    flex-direction: column;
    height: 100%;
    width: 100%;
    
` 
const Content = styled.Text`
    margin-left: auto;
    margin-Right: auto;
    padding-Left: 40px;
    font-weight: 9;
    font-size: 25px;
    color: white;
`
const Time = styled.View`
    height: 40px;
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    background-color: white;
`

export const Formprofile= ({navigation}) =>
{
    const isFocused = useIsFocused()
    const [name, setName] = useState('')
    const [morning, setMorning] = useState({})
    const [day, setDay] = useState({})
    const [evening, setEvening] = useState({})
    const [pic, setPic] = useState({})
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = async () => {
      setRefreshing(true);
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
      const response = await fetch(HOST + '/update_user_meals', requestOptions);
      setRefreshing(false)
      setTimeout(() => {
        setRefreshing(false);
      }, 2000);
    };
    async function GetEat() {
        try {
        const name = await SecureStore.getItemAsync('UserName');
        setName(name)

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
    
          const response = await fetch(HOST + '/get_user_breakfast', requestOptions);
          const response1 = await fetch(HOST + '/get_user_dinner', requestOptions);
          const response2 = await fetch(HOST + '/get_user_lunch', requestOptions);
          const data = await response.json();
          const data1 = await response1.json();
          const data2 = await response2.json();
          setMorning(data['breakfast'])
          setDay(data1['dinner'])
          setEvening(data2['lunch'])
        } catch (error) {
          console.log(error)
        }
      }

    useEffect(() => {GetEat()}, [isFocused, refreshing])

    return (
        <Main>
            <Header/>
            <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} horizontal = {false} style = {{height: "100%", width:"100%",marginLeft: 0, paddingLeft: 0}}>
            <Time>
                <Image source = {require("../images/morning.png")} style = {{width: 19, height: 19, 
                        marginRight: "1%"}}/> 
                <Text style={{fontSize: 20}}>Завтрак</Text>
            </Time>
            <Dish dishName = {morning['name']} recipe={morning['recipe']} ingredients={{ing: morning['grocery_basket'], prod: morning['structure']}}
            price={morning['total_price']} image={morning['name_png']}
            kkal={morning['calories']} title={morning['short']}/>

            <Time>
                <Image source = {require("../images/sun.png")} style = {{width: 20, height: 20, 
                        marginRight: "1%"}}/> 
                <Text style={{fontSize: 20}}>Обед</Text>
            </Time>

            <Dish dishName = {day['name']} recipe={day['recipe']} ingredients={{ing: day['grocery_basket'], prod: day['structure']}}
            price={day['total_price']} image={day['name_png']}
            kkal={day['calories']} title={day['short']}/>

            <Time>
                <Image source = {require("../images/noon.png")} style = {{width: 19, height: 19, 
                        marginRight: "1%"}}/> 
                <Text style={{fontSize: 20}}>Ужин</Text>
            </Time>
            
            <Dish dishName = {evening['name']} recipe={evening['recipe']} ingredients={{ing: evening['grocery_basket'], prod: evening['structure']}}
            price={evening['total_price']} image={evening['name_png']}
            kkal={evening['calories']} title={evening['short']}/>

            </ScrollView>
        </Main>
    )
}
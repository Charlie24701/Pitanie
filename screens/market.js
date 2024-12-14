import React, { useEffect, useState } from 'react';  
import {
    ScrollView,
    Text, 
    View,
    FlatList,
    TouchableOpacity,
    TextInput,
    Image,
    Dimensions,
} from 'react-native'; 
import styled from 'styled-components/native'
import { Header } from './components/header';
import { Product } from './components/product';
import { useIsFocused } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { HOST } from './settings.js';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Main = styled.View`
    flex-direction: column;
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
    background-color:white; 
`
const Dish = styled.View`
    flex-direction: column;
    width: 100%;
    height: 220px;
    borderBottomWidth: 1px;
    borderColor: #C9C9C9;
    background-color: white;
`
const Navbar = styled.View`
    height:10%;
    width:100%;
    background-color: white;
    borderTopWidth: 1px;
    borderColor: #C9C9C9;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`
const MYLine = styled.View`
    height: 2px;
    width: ${screenWidth/3}px;
    background-color: #808080;
    opacity: 0.2;
    borderRadius: 10px;
    margin-left: auto;
    margin-right: auto;
` 
const Ingredients = styled.View`
    width: ${screenWidth}px;
    padding-top: 5px;
` 
const Ingredient = styled.View`
    flex-direction: row;
    align-items: center;
    padding-top: 5px;
    padding-bottom: 5px;
    justify-content: space-between;
    width: ${screenWidth}px;
    padding-left: 20px;
    padding-right: 20px;
` 
const Item = styled.Text`
    max-width: ${screenWidth}px;
`

export const Market = ({navigation}) =>
{
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [basket, setBasket] = useState([])
    const isFocused = useIsFocused()

    async function GetMarket() {
        try {
        const user = await SecureStore.getItemAsync('UserName');
        setName(user)

          const requestOptions =
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              "name": user,
            }),
          }
    
          const response = await fetch(HOST + '/get_user_price_grocery', requestOptions);
          const data = await response.json();
          setBasket(data[1]['grocery_basket'])
          setPrice(data[0]['total_price'])
        } catch (error) {
          console.log(error)
        }
      }

    useEffect(() => {GetMarket()}, [isFocused])
    return (
        <View style={{position: 'relative', width: '100%', height: '100%'}}>
        <Header/>
        <Main>
        <FlatList data={basket} 
            renderItem={({item}) => (
                <TouchableOpacity activeOpacity={0.8} style={{alignItems: 'center'}}>
                    <Ingredient>
                    <Item>{item}</Item>
                    </Ingredient>
                    <MYLine />
                </TouchableOpacity>)} />
        </Main>
        <Ingredient style={{maxHeight: 50, width: screenWidth, borderTopColor: '#D7D7D7', borderTopWidth: 1, paddingLeft:30, paddingRight:30, marginRight: 'auto', 
            marginLeft: 'auto', position: 'absolute', bottom: 0}}>
                    <Item style={{fontSize: 16}}>Полная стоимость:</Item>
                    <Item style={{fontSize: 16}}>{price} руб</Item>
                </Ingredient>
        </View>
        
        
    )
}
import React, { useState } from 'react';  
import {
    ScrollView,
    Text, 
    View,
    TouchableOpacity,
    TextInput,
    Image,
    Button,
    FlatList,
    Dimensions
} from 'react-native'; 
import styled from 'styled-components/native'
import { Header } from './components/header';
import * as SecureStore from 'expo-secure-store';

import { Line } from 'react-native-svg';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Main = styled.View`
    flex-direction: column;
    height: 100%;
    width: 100%;

` 
const RecipeDish = styled.View`
    padding: 20px;

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
const Content = styled.ScrollView`
    flex-direction: column;
    height: 100%;
    max-width: 100%;


`
const Item = styled.Text`
    max-width: ${screenWidth/2.1}px;
`
export const Recipe = ({route, navigation}) =>
{
    const [ShowModal, setModal] = useState('false')
    const { name, image, recipe, ingredients, price } = route.params; 
    const ing = ingredients['ing']
    const prod = ingredients['prod']

    
    
    return (
        <Main>
        <Header back= {true}/>
            <Text style={{fontSize: 20, marginBottom: 10, marginTop: 10, textAlign: 'center'}}>
                    {name}
            </Text>
        <Content>
          <Image source = {{uri: image}}
          style={{height: screenHeight/3, width: screenWidth-40, borderRadius: 30, marginLeft: 'auto', marginRight: 'auto'}}
          />
          <MYLine style={{backgroundColor: 'red', opacity: 0.6, marginTop: 20, width: screenWidth/2}}/>
          <Text style={{fontSize: 18, marginTop: 10, textAlign: 'center'}}>
                    Ингредиенты
            </Text>
            
          <Ingredients>
                    {ing.map((item, index) => (
                        <TouchableOpacity activeOpacity={0.8} key={index} style={{alignItems: 'center'}}>
                            <Ingredient>
                            <Item>{item.charAt(0).toUpperCase() + item.slice(1)}</Item>
                            <Item>{prod[index]}</Item>
                            </Ingredient>
                            <MYLine />
                        </TouchableOpacity>
                    ))}
          </Ingredients>
          <Ingredient style={{marginRight: 'auto', width: 350, marginLeft: 'auto'}}>
          <Item style={{fontSize: 16}}>Полная стоимость:</Item>
          <Item style={{fontSize: 16}}>{price} руб</Item>
          </Ingredient>
          
          <MYLine style={{backgroundColor: 'red', opacity: 0.6, width: screenWidth/2}}/>
          <RecipeDish>
                <Text>{recipe}</Text>
          </RecipeDish>
          
        </Content>
        </Main>
        
        
    )
}
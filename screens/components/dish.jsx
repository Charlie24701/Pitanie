import React, { useState } from 'react';  
import {
    Text, 
    View,
    TouchableOpacity,
    Image,
} from 'react-native'; 
import styled from 'styled-components/native'
import { useRoute, useNavigation} from '@react-navigation/native';

const ContainerHeader = styled.View`
    height: 55px;
    width: 100%;
    background-color: #FF7575;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    padding-left: 2%;
    padding-right: 2%;
` 

const DishContent = styled.TouchableOpacity`
    flex-direction: row;
    width: 100%;
    align-items: center;
    justify-content: center;
    height: 220px;
    padding-left: 5px;
    padding-right: 5px;
    borderBottomWidth: 1px;
    borderColor: #C9C9C9;
    background-color: white;
`
const DishAbout = styled.View`
    flex-direction: column;
    padding-left: 5px;
    padding-right: 5px;
    width: 60%;
    min-height: 70%;
    max-height: 90%;
    overflow: hidden;
`
const Title = styled.Text`
    font-weight: normal;
    font-size: 18px;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-top: auto;
    margin-bottom: auto;
    `
const ContentText = styled.Text`
    font-weight: normal;
    font-size: 14px;
`
const Content = styled.Text`
    
`
const Cost = styled.Text`
    font-size: 16px;
    margin-top: auto;
    font-weight: 0
`
export const Dish = ({props, ingredients='N/A', recipe='N/A', image="/", kkal=0, dishName='Загрузка... ', price=0, title='Загрузка...'}) =>
{
    const navigation = useNavigation();
    return (

        <DishContent activeOpacity={0.8} onPress={() => navigation.navigate('Рецепт', {ingredients: ingredients, name: dishName, image: image, recipe: recipe, price: price})}>
            <Image source = { {uri: image} }
            style = {{width: '40%', height: '90%',
                borderRadius: 30
            }}
            />
            <DishAbout>

            <Text style= {{fontWeight: 'light', fontSize: 14, marginBottom: 'auto'}}>Ккал: {kkal}</Text>
            
            <View style={{marginBottom: 10, marginTop:10}}>
                <Title numberOfLines={3} ellipsizeMode='tail' style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>
                    {dishName} 
                </Title>
                <Content numberOfLines={5} ellipsizeMode='tail' style={{overflow: 'hidden', textOverflow: 'ellipsis'}}>
                    <ContentText>
                    {title}
                    </ContentText>
                </Content>
            </View>
            
            <Cost>Стоимость: {price} руб.</Cost>
            </DishAbout>
        </DishContent>
    )
}
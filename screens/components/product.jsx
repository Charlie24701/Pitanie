import React, { useState } from 'react';  
import {
    FlatList,
    Text, 
    View,
    TouchableOpacity,
    TextInput,
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

const ProductContent = styled.View`
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
export const Product = ({}) =>
{
    return (
        <ProductContent>
            
        </ProductContent>
    )
}
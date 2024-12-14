import React, { useState } from 'react';  
import {
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
    text-align: center;
    flex-direction: row;
    padding-left: 2%;
    padding-right: 2%;
` 
const Content = styled.Text`
    font-weight: 9;
    font-size: 25px;
    color: white;
    margin-right: auto;

`
const BackCross = styled.TouchableOpacity`
margin-right: auto;
`

const Found = styled.Image`

`

export const Header = ({name = 'None', back}) =>
{
    const navigation = useNavigation(); 
    const route = useRoute(); 
    const backBottom = (back) => { 
        if (back) {
            return ( 
                <BackCross onPress={() => navigation.goBack()}> 
                    <Image source = {require("../../images/back.png")} style = {{width: 40, height: 40,}}/> 
                </BackCross>  
            )
        }
    }
        
    return (
            <ContainerHeader> 
                {backBottom(back)} 
                <Content>
                    {name != 'None' ? name : route.name} 
                </Content>
                <Found source = {require("../../images/find.png")} style = {{width: 40, height: 40}}/> 
            </ContainerHeader>
    )
}


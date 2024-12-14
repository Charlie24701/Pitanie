import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
} from 'react-native';
import styled from 'styled-components/native'
import { Header } from './components/header';
import { useIsFocused } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';
import { HumanForm } from './humanForm';
import * as Updates from "expo-updates"
import { HOST } from './settings.js';

const Main = styled.View`
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
    
`
const Content = styled.View`
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top:30%;
    height: 300px;
`
const Kalories = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 300px;
`
const Info = styled.View`
    flex-direction: column;
    align-items: center;
    width: 100%;
`
const KkalContainer = styled.View`
    min-width: 50px;
    min-height: 30px;
    padding: 3px;
    background-color: pink;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    padding-left: 10px;
    padding-right: 10px
`
const ResetData = styled.TouchableOpacity`
    height: 50px;
    width: 200px;
    background-color: #FF7575;
    align-items: center;
    justify-content: center;
    border-radius: 20px;
    margin-top: 20px;
`


export const Profile = ({ navigation }) => {
    const [myCalories, setMyCalories] = useState('N/A')
    const [myDiet, SetDiet] = useState('N/A')
    const [visible, setVisible] = useState(false)
    const [name, setName] = useState('')
    const isFocused = useIsFocused()

    async function GetKkal(name) {
    
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
    
          const response = await fetch(HOST + '/get_user_calories', requestOptions);
          const dat = await response.json();
          setMyCalories(dat["calories"])
        } catch (error) {
            console.log(error)
        }
      }
    const doShow = () =>
        setVisible(true)
    const dontShow = () =>
        setVisible(false)

    const retrieveData = async () => {
        try {
            const name = await SecureStore.getItemAsync('UserName');
            const diet = await SecureStore.getItemAsync('Diet');
            name ? setName(name) : setName('Не найдено')
            SetDiet(diet)
            GetKkal(name)
        } catch (error) {
            console.log('Error retrieving data:', error);
        }
    };

    const Exit = async () => {
        try {
            await SecureStore.setItemAsync('Active', 'false');
            await SecureStore.deleteItemAsync('UserName');
            Updates.reloadAsync()
            alert('Перезайдите для выхода из системы!');
            console.log('UserExit');
        } catch (error) {
            console.log(error)
        }
    };

    

    useEffect(() => { retrieveData() }, [isFocused, dontShow])

    return (
        <View>
            <HumanForm Show={visible} setShow={dontShow} exit={true} />
            <Header />
            <Main>
                <TouchableOpacity style={{ position: 'absolute', right: 5 }} onPress={() => { Exit() }}>
                    <Image source={require("../images/exit.png")} style={{ width: 60, height: 60, }} />
                </TouchableOpacity>
                <Content>
                    <Image source={require("../images/profile.png")} style={{ width: 200, height: 200, }} />
                    <Text style={{ fontSize: 20, marginTop: 5, marginBottom: 10 }}>{name}</Text>
                <Info>
                    <Kalories>
                        <Text style={{ width: 200, fontSize: 14 }}>Ваша ежедневная норма каллорий составляет</Text>
                        <KkalContainer>
                            <Text>{myCalories}</Text>
                        </KkalContainer>
                    </Kalories>
                    <Kalories>
                    <Text style={{fontSize: 14 }}>Ваша диета</Text>
                        <KkalContainer>
                            <Text>{myDiet}</Text>
                        </KkalContainer>
                    </Kalories>
                    </Info>

                    <ResetData activeOpacity={0.9} navigation={navigation} onPress={doShow}>
                        <Text>
                            Пересчитать
                        </Text>
                    </ResetData>
                </Content>
            </Main>
        </View>


    )
}
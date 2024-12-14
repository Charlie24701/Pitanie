import { StyleSheet, Text, View } from 'react-native';
import { Formprofile } from './screens/formprofile.js'
import { Profile } from './screens/profile.js';
import styled from 'styled-components/native'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Market } from './screens/market.js';
import { Recipe } from './screens/recipe.js';
import SvgDish from './images/svg/SvgDish.js';
import SvgProfile from './images/svg/SvgProfile.js';
import SvgMarket from './images/svg/SvgMarket.js';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabStack = () => {
  return (<Tab.Navigator screenOptions={{
    headerShown: false}} >
    <Tab.Screen
        name="Главная"
        component={Formprofile}
        options= {{
          tabBarLabel: 'Меню',
          tabBarActiveTintColor: 'red',
          tabBarIcon: ({focused, color, size}) =>
            <SvgDish size = {40} color = {focused ? 'red' : '#C3C3C3'}/>
        }}
    />
    <Tab.Screen
        name="Корзина"
        component={Market}
        options= {{
          tabBarLabel: 'Корзина',
          tabBarActiveTintColor: 'red',
          tabBarIcon: ({focused, color, size}) =>
            <SvgMarket size = {30} color = {focused ? 'red' : '#C3C3C3'}/>
        }}
    />
    <Tab.Screen
        name="Профиль"
        component={Profile}
        options= {{
          tabBarLabel: 'Профиль',
          tabBarActiveTintColor: 'red',
          tabBarIcon: ({focused, color, size}) =>
            <SvgProfile size = {40} color = {focused ? 'red' : '#C3C3C3'}/>
        }}
    />
     
</Tab.Navigator>)
  
}
export function Navigator(someData) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown: false
        }}>
          <Stack.Screen name={'Tab'} component = {TabStack}/>
          <Stack.Screen name='Главная' component={Formprofile}/>
          <Stack.Screen name='Профиль' component={Profile}/>
          <Stack.Screen name='Корзина' component={Market}/>
          <Stack.Screen name='Рецепт'>
          {props => <Recipe {...props} name={someData}/>}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    backgroundColor: '#fff',

  },
});

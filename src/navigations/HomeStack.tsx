import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import ProductsList from '../screens/ProductsList';
import LoginForm from '../screens/Login';
const Home = createNativeStackNavigator();
const HomeStack = () => {
  return (
    <Home.Navigator>
      {/* <Home.Screen name='login' component={LoginForm}/> */}
      <Home.Screen
        name="Homescreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Home.Screen name="ProductsList" component={ProductsList} />
    </Home.Navigator>
  );
};

export default HomeStack;

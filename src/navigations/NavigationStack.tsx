import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet} from 'react-native';
import Notifications from '../screens/Notifications';
import ProductItem from '../screens/ProductItem';
import HomeStack from './HomeStack';
import BottomStackNavigation from './BottomStackNavigation';
const Stack = createNativeStackNavigator();
const NavigationStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='main' component={BottomStackNavigation}/>
      <Stack.Screen
        name="Home"
        component={HomeStack}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen name="Notifications" component={Notifications} />

      <Stack.Screen name="ProductItem" component={ProductItem} /> */}
    </Stack.Navigator>
  );
};

export default NavigationStack;

const styles = StyleSheet.create({});

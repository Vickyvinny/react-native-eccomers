import '@react-native-firebase/app';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import NavigationStack from './src/navigations/NavigationStack';
const linking = {
  prefixes: ['myapp://app'],
  config: {
    screens: {
      Home: {
        path: 'home',
        screens: {
          HomeScreen: 'homeScreen',
          ProductsList: 'products',
        },
      },
      Notifications: {
        path: 'notifications',
      },
      ProductItem: 'productsItem',
    },
  },
};

const App = () => {
  return (
    <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
      <NavigationStack />
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({});

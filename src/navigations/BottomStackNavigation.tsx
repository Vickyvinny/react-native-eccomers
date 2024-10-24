import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {StyleSheet} from 'react-native';
import DownloadingScreen from '../screens/DownloadingScreen';
import FsScreen from '../screens/FsScreen';
import TopStackNavigation from './TopStackNavigation';


const Tab = createBottomTabNavigator();
const BottomStackNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="top" component={TopStackNavigation} />
      <Tab.Screen name="files" component={FsScreen} />
      <Tab.Screen name="downloading" component={DownloadingScreen} />
    </Tab.Navigator>
  );
};

export default BottomStackNavigation;

const styles = StyleSheet.create({});

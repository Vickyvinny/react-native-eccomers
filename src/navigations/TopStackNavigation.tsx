import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {StyleSheet} from 'react-native';
import ImagesScreen from '../top_tabs/ImagesScreen';
import VideosScreen from '../top_tabs/VideosScreen';
const Tab = createMaterialTopTabNavigator();
const TopStackNavigation = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="images" component={ImagesScreen} />
      <Tab.Screen name="videos" component={VideosScreen} />
    </Tab.Navigator>
  );
};

export default TopStackNavigation;

const styles = StyleSheet.create({});

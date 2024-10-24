import messaging from '@react-native-firebase/messaging';
import {NavigationProp} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {ImageBackground, SafeAreaView, StyleSheet, View} from 'react-native';
import LocalNotification from '../components/LocalNotifications';
import CommonButton from './CommonButton';
type RootStackParamList = {
  ProductItem: undefined;
};
interface IProps {
  navigation: NavigationProp<RootStackParamList>;
}
const HomeScreen = ({navigation}: IProps) => {
  const getFCMToken = async () => {
    const token = await messaging().getToken();
    console.log(token, '===>');
  };
  useEffect(() => {
    getFCMToken();
  }, []);
  const handleNavigationAction = () => {
    LocalNotification();
    navigation.navigate('ProductItem');
  };
  const goBackAction = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ImageBackground
        style={{
          flex: 1,
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
        source={require('../assets/bannerOne.jpg')}
        resizeMode="cover">
        <View style={{width: '90%', marginBottom: 10}}>
          <CommonButton
            onPress={handleNavigationAction}
            tittle={'Get Notification'}
          />
          <CommonButton onPress={goBackAction} tittle={'Go Back'} />
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default HomeScreen;
const style = StyleSheet.create({
  buttonContainer: {
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    elevation: 5,
    backgroundColor: 'red',
    shadowColor: 'red',
    width: '95%',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    textDecorationLine: 'underline',
  },
});

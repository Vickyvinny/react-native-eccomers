import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import React, {useEffect} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {AccessToken, LoginManager, Settings} from 'react-native-fbsdk-next';

import GitHubScreen from './AuthServices';
interface Iprops {
  title: string;
}
interface GoogleSignInError extends Error {
  code?: string;
}
const CommonSocialAccount = ({title}: Iprops) => {
  const googleLogin = async (): Promise<void> => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info:', userInfo);
    } catch (error) {
      const googleError = error as GoogleSignInError;
      console.error('Login Error:', googleError); 
      if (googleError.code) {
        switch (googleError.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            console.log('Sign-in was cancelled by the user.');
            break;
          case statusCodes.IN_PROGRESS:
            console.log('Sign-in is currently in progress.');
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            console.log('Google Play Services are not available.');
            break;
          default:
            console.log('An unexpected error occurred:', googleError.message);
        }
      } else {
        console.log('An unknown error occurred:', googleError.message);
      }
    }
  };
  const webClientId =
    '617237604266-298sadev2dmm86386a5lacpgo0q02rp5.apps.googleusercontent.com';

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: webClientId,
      iosClientId:
        '617237604266-r6jklf706h92ltmlfrsu21i6ib2jmop0.apps.googleusercontent.com',
    });
  }, []);
  const handleLogin = async () => {
    try {
      if (!LoginManager) {
        Alert.alert('Error', 'LoginManager is not available.');
        return;
      }
      const loginResult = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);
      if (loginResult.isCancelled) {
        Alert.alert('Login Cancelled', 'User cancelled the login.');
        return;
      }
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        Alert.alert('Login Failed', 'Failed to get access token.');
        return;
      }
  
      const { accessToken } = data;
      Alert.alert('Login Success', `Access Token: ${accessToken}`);
    } catch (error:any) {
      Alert.alert('Login Failed', error.message || 'Unknown error occurred');
    }
  };

  useEffect(() => {
    Settings.initializeSDK();
  }, []);

  return (
    <View style={styles.bottomCpntainer}>
      <Text style={styles.forgotText}>Or {title} with social account</Text>
      <View style={{flexDirection: 'row', gap: 20}}>
        <TouchableOpacity
          style={styles.bottomIconContainer}
          onPress={googleLogin}>
          <Image source={require('../assets/google.png')} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomIconContainer}
          onPress={handleLogin}>
          <Image source={require('../assets/facebook.png')} />
        </TouchableOpacity>
        <GitHubScreen />
      </View>
    </View>
  );
};

export default CommonSocialAccount;

const styles = StyleSheet.create({
  forgotText: {
    fontSize: 16,
    fontFamily: 'Metropolis',
    lineHeight: 20,
    color: 'black',
  },
  bottomIconContainer: {
    width: 100,
    height: 70,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomCpntainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 60,
    gap: 20,
    marginTop: 50,
    flex: 1,
  },
});



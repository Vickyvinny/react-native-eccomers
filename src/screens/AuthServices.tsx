import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { authorize } from 'react-native-app-auth';

const config = {
  clientId: 'Ov23licEW2LZVKKEpLAu',
  clientSecret: 'fb0e9e6740f350ad57aabc77dad6ed54a1036396',
  redirectUrl: 'myapp://app/notifications',
  scopes: ['user:email'], 
  serviceConfiguration: {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
  },
};

export default function GitHubScreen() {
  const signInWithGitHub = async () => {
    try {
      const result = await authorize(config);
      console.log('Authentication result:', result);
    } catch (error:any) {
      console.error('Authentication failed:', error);
      console.error('Full error object:', error);

      if (error.message) {
        console.error('Error message:', error.message);
      }
      if (error.response) {
        console.error('Response data:', error.response);
      } else {
        console.error('No response received');
      }
    }
  };

  return (
    <TouchableOpacity onPress={signInWithGitHub} style={styles.button}>
      <Image
        source={require('../assets/github.png')}
        style={{ width: 40, height: 40 }}
        resizeMode="cover"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 70,
    borderRadius: 25,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

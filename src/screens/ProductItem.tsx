import React from 'react';
import {
  ImageBackground,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const ProductItem = () => {
  const URL_ONE = 'myapp://app/notifications';
  const URL_TWO = 'myapp://app/home/login';
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={require('../assets/bannerTwo.jpg')}
        style={styles.container}>
        <View
          style={{
            flex: 1,
            gap: 10,
            justifyContent: 'flex-end',
            marginBottom: 20,
          }}>
          <TouchableOpacity style={styles.buttonCommonStyles}>
            <Text style={styles.buttonText}>Screen One</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCommonStyles}>
            <Text
              style={styles.buttonText}
              onPress={() => Linking.openURL(URL_ONE)}>
              Screen Two
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonCommonStyles}
            onPress={() => Linking.openURL(URL_TWO)}>
            <Text style={styles.buttonText}>Screen Three</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'contain',
    padding: 10,
  },
  buttonCommonStyles: {
    padding: 15,
    borderRadius: 100,
    elevation: 5,
    backgroundColor: 'white',
    shadowColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'black',
  },
  loader: {
    marginTop: 20,
  },
  dateContainer: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});

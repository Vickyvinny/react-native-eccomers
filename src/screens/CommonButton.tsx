import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
interface IProps {
  onPress: () => void;
  tittle: string;
}
const CommonButton = ({onPress, tittle}: IProps) => {
  return (
    <TouchableOpacity style={styles.buttonContainer} onPress={onPress}>
      <Text style={styles.loginButtonText}>{tittle}</Text>
    </TouchableOpacity>
  );
};

export default CommonButton;

const styles = StyleSheet.create({
  loginButtonText: {
    fontSize: 16,
    fontFamily: 'Metropolis',
    lineHeight: 20,
    color: 'white',
  },
  buttonContainer: {
    backgroundColor: 'red',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    height: 50,
  },
});

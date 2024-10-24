import {NavigationProp} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Alert,
  BackHandler,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CommonButton from './CommonButton';
import CommonSocialAccount from './CommonSocialAccount';
import KeyboardWrapper from './KeyboardWrapper';

type RootStackParamList = {
  Login: undefined;
  Homescreen: undefined;
};

interface IProps {
  navigation: NavigationProp<RootStackParamList>;
}

const LoginForm = ({navigation}: IProps) => {
  const [securePassword, setSecurePassword] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState({
    emailError: '',
    passwordError: '',
    successMssg: '',
    email: '',
  });
  const [errorFields, setErrorFields] = useState({
    email: false,
    password: false,
  });
  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleLogin = async () => {
    let emailError = '';
    let passwordError = '';
    let successMssg = '';

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const newErrorFields = {email: false, password: false};

    if (!email) {
      emailError = 'Required';
      newErrorFields.email = true;
    } else if (!emailRegex.test(email)) {
      emailError = 'Invalid Email';
      newErrorFields.email = true;
    } else {
      setIsEmailValid(true);
    }
    if (!password) {
      passwordError = 'Required';
      newErrorFields.password = true;
    } else if (!passwordRegex.test(password)) {
      passwordError = 'Password must be at least 8 characters';
      newErrorFields.password = true;
    }
    if (!emailError && !passwordError) {
      try {
        if (email && password) {
          successMssg = 'Login successful!';
        } else {
          emailError = 'No registered users found';
          newErrorFields.email = true;
          setIsEmailValid(false);
        }
      } catch (e) {
        Alert.alert('Error', 'Something went wrong. Please try again later.');
      }
    }
    setErrorMsg({
      emailError,
      passwordError,
      successMssg,
      email,
    });
    setErrorFields(newErrorFields);
  };

  const handleExitAction = () => {
    BackHandler.exitApp();
  };

  const Check = (
    isValid: boolean,
    setter: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    return isValid ? (
      <Ionicons name={'checkmark'} size={25} color="green" />
    ) : (
      <TouchableOpacity onPress={ClearInput(setter)}>
        <Ionicons name={'close-outline'} size={25} color="red" />
      </TouchableOpacity>
    );
  };

  const ClearInput = (setter: React.Dispatch<React.SetStateAction<string>>) => {
    return () => setter('');
  };

  const handleNotification = () => {
    navigation.navigate('Homescreen');
  };

  return (
    <KeyboardWrapper>
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.topContainer}>
            <View style={styles.headerContainer}>
              <TouchableOpacity style={styles.icon} onPress={handleExitAction}>
                <Text>i</Text>
              </TouchableOpacity>
              <TouchableWithoutFeedback>
                <Text style={styles.forgotText}>Don't have an Account?</Text>
              </TouchableWithoutFeedback>
            </View>
            <Text style={styles.loginText}>Login</Text>
          </View>
          <View style={styles.formContainer}>
            <View
              style={[
                styles.inputContainer,
                errorFields.email && styles.errorBorder,
              ]}>
              <Text style={styles.inputText}>Email</Text>
              <View style={styles.inputRow}>
                <TextInput
                  value={email}
                  onChangeText={e => setEmail(e)}
                  style={styles.textInput}
                />
                {email.length > 0 && Check(isEmailValid, setEmail)}
              </View>
            </View>
            {errorMsg.emailError.length > 0 && (
              <Text style={styles.errorText}>{errorMsg.emailError}</Text>
            )}
            <View
              style={[
                styles.inputContainer,
                errorFields.password && styles.errorBorder,
              ]}>
              <Text style={styles.inputText}>Password</Text>
              <View style={styles.inputRow}>
                <TextInput
                  secureTextEntry={securePassword}
                  value={password}
                  onChangeText={password => setPassword(password)}
                  style={styles.textInput}
                />
                <TouchableOpacity
                  style={styles.eyeIcon}
                  onPress={() => setSecurePassword(prev => !prev)}>
                  {securePassword ? (
                    <Ionicons name={'eye-outline'} size={25} />
                  ) : (
                    <Ionicons name={'eye-off-outline'} size={25} />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            {errorMsg.passwordError.length > 0 && (
              <Text style={styles.errorText}>{errorMsg.passwordError}</Text>
            )}
            <View style={styles.forgotPassContainer}>
              <Text style={styles.successText}>{errorMsg.successMssg}</Text>
              <TouchableOpacity style={styles.forgotButton}>
                <Text style={styles.forgotText}>Forgot your password?</Text>
              </TouchableOpacity>
            </View>

            <CommonButton onPress={handleLogin} tittle={'Login'} />
            <CommonButton
              onPress={handleNotification}
              tittle={'Notification'}
            />
          </View>
        </View>
        <CommonSocialAccount title="login" />
      </SafeAreaView>
    </KeyboardWrapper>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  innerContainer: {
    flex: 2,
  },
  topContainer: {
    padding: 10,
    gap: 20,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  icon: {
    marginVertical: 10,
  },
  loginText: {
    fontSize: 34,
    fontFamily: 'Metropolis',
    lineHeight: 34,
    color: 'black',
    marginTop: 20,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
    gap: 20,
    marginTop: 40,
  },
  inputContainer: {
    padding: 10,
    height: 70,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  inputRow: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textInput: {
    width: '80%',
  },
  eyeIcon: {
    width: '10%',
  },
  forgotPassContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 5,
    alignItems: 'center',
  },
  inputText: {
    fontSize: 11,
    fontFamily: 'Metropolis',
    lineHeight: 11,
    color: 'black',
  },
  forgotText: {
    fontSize: 16,
    fontFamily: 'Metropolis',
    lineHeight: 20,
    color: 'black',
  },
  successText: {
    fontSize: 15,
    color: 'green',
  },
  errorText: {
    position: 'absolute',
    left: 20,
    color: 'red',
  },
  forgotButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  errorBorder: {
    borderColor: 'white',
    borderWidth: 2,
  },
});

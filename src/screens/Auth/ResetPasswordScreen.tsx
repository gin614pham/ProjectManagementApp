import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import {ColorPalette} from '../../constants/styles/ColorPalette';
import SIZE from '../../constants/styles/Font';
import auth from '../../api/auth';

const ResetPasswordScreen = ({navigation}: any) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [url, setUrl] = useState('');

  const fetchEmail = async () => {
    const res = await auth.forgotPassword(email);
    res.success ? setUrl(res.resetUrl) : setUrl('');
  };

  const handleResetPassword = async () => {
    if (password === confirmPassword) {
      const res = await auth.resetPassword(url, password);
      res.success ? navigation.navigate('LoginScreen') : console.log(res.error);
    }
  };

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Reset Password</Text>
      <TextInput
        editable={url === '' ? true : false}
        style={styles.sectionInput}
        onChangeText={text => setEmail(text)}
        placeholder="Email"
      />
      {url === '' ? (
        <TouchableOpacity
          style={styles.sectionLoginButton}
          onPress={fetchEmail}>
          <Text style={styles.sectionTitleLogin}>Forgot Password</Text>
        </TouchableOpacity>
      ) : (
        <View>
          <TextInput
            style={styles.sectionInput}
            onChangeText={text => setPassword(text)}
            placeholder="Password"
            secureTextEntry
          />
          <TextInput
            style={styles.sectionInput}
            onChangeText={text => setConfirmPassword(text)}
            placeholder="Confirm Password"
            secureTextEntry
          />
          <TouchableOpacity
            style={styles.sectionLoginButton}
            onPress={handleResetPassword}>
            <Text style={styles.sectionTitleLogin}>Reset Password</Text>
          </TouchableOpacity>
        </View>
      )}
      <Text style={styles.sectionRegisterText}>
        If you don't have an account, you can{' '}
        <Text
          style={styles.sectionLink}
          onPress={() => navigation.navigate('RegisterScreen')}>
          Register here
        </Text>{' '}
        Or you can{' '}
        <Text
          style={styles.sectionLink}
          onPress={() => navigation.navigate('LoginScreen')}>
          Login
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    backgroundColor: ColorPalette.WHITE,
    padding: 20,
    borderRadius: 10,
    shadowColor: ColorPalette.SHADOW,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flex: 1,
  },
  sectionTitle: {
    fontSize: SIZE.LARGE,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionInput: {
    height: 40,
    borderColor: ColorPalette.LIGHT_GRAY,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  sectionLoginButton: {
    backgroundColor: ColorPalette.BACKGROUND_LOGIN_BUTTON,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  sectionTitleLogin: {
    color: ColorPalette.LIGHT_TEXT,
    fontSize: SIZE.MEDIUM,
    fontWeight: 'bold',
  },
  sectionRegisterText: {
    fontSize: SIZE.SMALL,
    marginTop: 10,
  },
  sectionLink: {
    color: ColorPalette.BACKGROUND_LOGIN_BUTTON,
    textDecorationLine: 'underline',
  },
});
export default ResetPasswordScreen;

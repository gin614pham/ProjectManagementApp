import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {AuthContext} from '../../contexts/AuthContext';
import {ColorPalette} from '../../constants/styles/ColorPalette';
import SIZE from '../../constants/styles/Font';

/**
 * Renders a login screen with input fields for username and password.
 * The user can enter their credentials and press the "Login" button to log in.
 *
 * @param {any} navigation - The navigation object used for navigating to other screens.
 * @return {JSX.Element} The rendered login screen component.
 */
const LoginScreen = ({navigation}: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const authContext = useContext(AuthContext);

  /**
   * Handles the login functionality.
   *
   * @param {string} username - The username of the user.
   * @param {string} password - The password of the user.
   * @return {void} This function does not return any value.
   */
  const handleLogin = () => {
    authContext ? authContext.signIn(username, password) : {};
  };

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Login</Text>
      <TextInput
        style={styles.sectionInput}
        onChangeText={text => setUsername(text)}
        placeholder="Username"
      />
      <TextInput
        style={styles.sectionInput}
        placeholder="Password"
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      <TouchableOpacity style={styles.sectionLoginButton} onPress={handleLogin}>
        <Text style={styles.sectionTitleLogin}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.sectionRegisterText}>
        If you don't have an account, you can{' '}
        <Text
          style={styles.sectionLink}
          onPress={() => navigation.navigate('RegisterScreen')}>
          Register here
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

export default LoginScreen;

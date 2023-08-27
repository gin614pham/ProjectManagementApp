import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {AuthContext} from '../../contexts/AuthContext';
import SIZE from '../../constants/styles/Font';
import {ColorPalette} from '../../constants/styles/ColorPalette';

/**
 * Renders the Register screen component.
 *
 * @param {object} navigation - The navigation object.
 * @return {JSX.Element} The rendered Register screen component.
 */
const RegisterScreen = ({navigation}: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const authContext = useContext(AuthContext);

  /**
   * Handles the registration process.
   *
   * @param {string} name - The name of the user.
   * @param {string} username - The username of the user.
   * @param {string} password - The password of the user.
   * @return {void} This function does not return any value.
   */
  const handleRegister = () => {
    authContext ? authContext.signUp(name, username, password) : {};
  };

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Register</Text>
      <TextInput
        style={styles.sectionInput}
        placeholder="Name"
        onChangeText={text => setName(text)}
      />
      <TextInput
        style={styles.sectionInput}
        placeholder="Email"
        onChangeText={text => setUsername(text)}
      />
      <TextInput
        style={styles.sectionInput}
        placeholder="Password"
        secureTextEntry
        onChangeText={text => setPassword(text)}
      />
      <TouchableOpacity
        style={styles.sectionRegisterButton}
        onPress={handleRegister}>
        <Text style={styles.sectionTitleRegister}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.sectionTitleLogin}>
          Already have an account? <Text style={styles.sectionLink}>Login</Text>
        </Text>
      </TouchableOpacity>
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
  sectionRegisterButton: {
    backgroundColor: ColorPalette.BACKGROUND_LOGOUT_BUTTON,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionTitleRegister: {
    color: ColorPalette.LIGHT_TEXT,
    fontSize: SIZE.MEDIUM,
    fontWeight: 'bold',
  },
  sectionTitleLogin: {
    fontSize: SIZE.SMALL,
    marginTop: 10,
  },
  sectionLink: {
    color: ColorPalette.BACKGROUND_LOGIN_BUTTON,
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;

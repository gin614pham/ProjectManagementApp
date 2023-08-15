import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import auth from '../api/auth';
import {useToken} from '../tokens/TokenContext';

const LoginScreen = ({navigation}: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {setToken} = useToken();

  const fetchToken = async (username: string, password: string) => {
    const res = await auth.login(username, password);
    if (res) {
      setToken(res.token);
      navigation.navigate('ProjectScreen');
    }
  };

  const handleLogin = () => {
    fetchToken(username, password);
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
      <Text>
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
    marginTop: 32,
    paddingHorizontal: 24,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionLoginButton: {
    marginTop: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
    width: '100%',
  },
  sectionTitleLogin: {
    fontSize: 18,
    paddingVertical: 8,
    color: 'blue',
    textAlign: 'center',
  },
  sectionInput: {
    marginTop: 8,
    paddingVertical: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
    color: 'black',
    width: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 18,
    fontWeight: '600',
    height: 40,
  },
  sectionLink: {
    marginTop: 8,
    paddingVertical: 8,
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;

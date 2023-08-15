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

const RegisterScreen = ({navigation}: any) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {setToken} = useToken();
  const [name, setName] = useState('');

  const fetchToken = async (
    name: string,
    username: string,
    password: string,
  ) => {
    const res = await auth.register(name, username, password);
    if (res) {
      setToken(res.token);
    }
  };

  const handleRegister = () => {
    fetchToken(name, username, password);
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
        <Text style={styles.sectionLink}>Login</Text>
      </TouchableOpacity>
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
  sectionRegisterButton: {
    marginTop: 8,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
    width: '100%',
  },
  sectionTitleRegister: {
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

export default RegisterScreen;

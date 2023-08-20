import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import ProjectScreen from '../screens/Project/ProjectScreen';
import AddProjectScreen from '../screens/Project/AddProjectScreen';
import tokenSession from '../utils/EncryptedStorage/tokenSession';

const Navigation = () => {
  const [state, setState] = useState({
    token: '',
    role: '',
    isloading: false,
    isSignout: false,
  });

  useEffect(() => {
    const getToken = async () => {
      const token = await tokenSession.getToken();
      setState({
        ...state,
        token: token,
      });
    };
    getToken();
  }, []);

  useEffect(() => {
    console.log('token', state.token);
  }, [state.token]);

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {state.token ? (
          <>
            <Stack.Screen
              options={{
                headerShown: true,
                title: 'Project',
                headerBackVisible: false,
              }}
              name="ProjectScreen"
              component={ProjectScreen}
            />
            <Stack.Screen
              options={{headerShown: true}}
              name="AddProjectScreen"
              component={AddProjectScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen
              options={{headerShown: false}}
              name="LoginScreen"
              component={LoginScreen}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="RegisterScreen"
              component={RegisterScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

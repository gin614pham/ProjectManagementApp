import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useMemo, useState} from 'react';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import tokenSession from '../utils/EncryptedStorage/tokenSession';
import {AuthContext} from '../contexts/AuthContext';
import {AuthContextType} from '../types';
import auth from '../api/auth';
import DrawerNavigation from './DrawerNavigation';
import AddProjectScreen from '../screens/Project/AddProjectScreen';
import userSession from '../utils/EncryptedStorage/userSession';
import DetailProjectScreen from '../screens/Project/DetailProjectScreen';

const fetchToken = async (username: string, password: string) => {
  const res = await auth.login(username, password);
  res && (await tokenSession.storeToken(res.token));
  return res.success;
};

const Navigation = () => {
  const [state, setState] = useState({
    token: '',
    role: '',
  });

  const authContext = useMemo(
    () =>
      ({
        signIn: async (username: string, password: string) => {
          (await fetchToken(username, password)) && (await getToken());
        },
        signOut: async () => {
          tokenSession.removeToken();
          await getToken();
        },
        signUp: async (name: string, email: string, password: string) => {
          const res = await auth.register(name, email, password);
          res.success
            ? (await tokenSession.storeToken(res.token), await getToken())
            : console.log(res.error);
        },
      } as AuthContextType),
    [],
  );

  const getToken = async () => {
    const token = await tokenSession.getToken();
    token
      ? (await userSession.storeUser(token),
        setState({token, role: (await userSession.getUser())?.role || ''}))
      : (userSession.removeUser(), setState({token: '', role: ''}));
    console.log(token);
  };

  useEffect(() => {
    getToken();
  }, []);

  const Stack = createNativeStackNavigator();

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={options.ScreenOption}>
          {state.token ? (
            <>
              <Stack.Screen
                name="DrawerNavigation"
                component={DrawerNavigation}
              />
              <Stack.Screen
                name="AddProjectScreen"
                options={options.AddProjectScreen}
                component={AddProjectScreen}
              />
              <Stack.Screen
                name="DetailProjectScreen"
                options={options.DetailProjectScreen}
                component={DetailProjectScreen}
              />
            </>
          ) : (
            <>
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

const options = {
  ScreenOption: {
    headerShown: false,
  },
  AddProjectScreen: {
    headerShown: true,
    title: 'Add Project',
  },
  DetailProjectScreen: {
    headerShown: true,
    title: 'Detail Project',
  },
};

export default Navigation;

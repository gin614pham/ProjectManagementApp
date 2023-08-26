import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useMemo, useState} from 'react';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import ProjectScreen from '../screens/Project/ProjectScreen';
import AddProjectScreen from '../screens/Project/AddProjectScreen';
import tokenSession from '../utils/EncryptedStorage/tokenSession';
import {AuthContext} from '../contexts/AuthContext';
import {AuthContextType} from '../types';
import auth from '../api/auth';
import ProfileScreen from '../screens/User/ProfileScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerNavigation from './DrawerNavigation';

const fetchToken = async (username: string, password: string) => {
  const res = await auth.login(username, password);
  if (res) {
    await tokenSession.storeToken(res.token);
  }
  return res.success;
};

const Navigation = () => {
  const [state, setState] = useState({
    token: '',
    role: '',
    isloading: false,
    isSignout: false,
  });

  const authContext = useMemo(
    () =>
      ({
        signIn: async (username: string, password: string) =>
          (await fetchToken(username, password)) ? await getToken() : {},
        signOut: () => tokenSession.removeToken(),
        signUp: (name: string, email: string, password: string) => {},
      } as AuthContextType),
    [],
  );

  const getToken = async () => {
    const token = await tokenSession.getToken();
    setState({
      ...state,
      token: token,
    });
  };

  useEffect(() => {
    getToken();
  }, []);

  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();

  return (
    <AuthContext.Provider value={authContext}>
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
                component={DrawerNavigation}
              />
              <Stack.Screen
                options={{
                  headerShown: true,
                  title: 'Profile',
                  headerBackVisible: false,
                }}
                name="ProfileScreen"
                component={ProfileScreen}
              />
              {/* <Stack.Screen
                options={{headerShown: true}}
                name="AddProjectScreen"
                component={AddProjectScreen}
              /> */}
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
    </AuthContext.Provider>
  );
};

export default Navigation;

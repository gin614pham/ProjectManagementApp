import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import RegisterScreen from '../screens/Auth/RegisterScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import ProjectScreen from '../screens/Project/ProjectScreen';
import AddProjectScreen from '../screens/Project/AddProjectScreen';

const Navigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

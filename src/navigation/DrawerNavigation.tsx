import {createDrawerNavigator} from '@react-navigation/drawer';
import React, {useEffect, useState} from 'react';
import ProfileScreen from '../screens/User/ProfileScreen';
import ProjectScreen from '../screens/Project/ProjectScreen';
import UserScreen from '../screens/User/UserScreen';
import userSession from '../utils/EncryptedStorage/userSession';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  const [role, setRole] = useState('');

  const getRole = async () => {
    const res = await userSession.getUser();
    res ? setRole(res.role) : setRole('');
  };

  useEffect(() => {
    getRole();
  }, []);

  return (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Project"
        options={{title: 'Project'}}
        component={ProjectScreen}
      />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
      {role === 'admin' && <Drawer.Screen name="User" component={UserScreen} />}
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;

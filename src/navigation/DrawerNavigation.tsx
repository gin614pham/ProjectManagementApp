import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import ProfileScreen from '../screens/User/ProfileScreen';
import {Text, TouchableOpacity, View} from 'react-native';

const Drawer = createDrawerNavigator();

const DrawerNavigation = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="MainContent" component={MainContent} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

const MainContent = ({navigation}: any) => {
  return (
    <View>
      <Text>Main Content</Text>
      <TouchableOpacity onPress={() => console.log('Profile')}>
        <Text>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default DrawerNavigation;

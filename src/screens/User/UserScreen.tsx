import React from 'react';
import {View} from 'react-native';
import UserList from '../../components/UserList';
import {StyleSheet} from 'react-native';

const UserScreen = () => {
  return (
    <View style={styles.container}>
      <UserList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default UserScreen;

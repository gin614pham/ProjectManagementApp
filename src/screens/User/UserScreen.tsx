import React from 'react';
import {View} from 'react-native';
import UserList from '../../components/UserList';
import {StyleSheet} from 'react-native';

const UserScreen = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      <UserList navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default UserScreen;

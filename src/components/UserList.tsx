import React, {useEffect, useState} from 'react';
import {User} from '../types';
import tokenSession from '../utils/EncryptedStorage/tokenSession';
import user from '../api/user';
import {FlatList} from 'react-native-gesture-handler';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ColorPalette} from '../constants/styles/ColorPalette';

const UserList = ({navigation}: any) => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const token = await tokenSession.getToken();
    const res = await user.getListUser(token);
    res.success ? setUsers(res.data) : console.log(res.error);
  };

  const onPress = (id: string) => {
    navigation.navigate('DetailUserScreen', {key: id});
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchUsers();
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <FlatList
      data={users}
      renderItem={({item}) => {
        return (
          <View style={styles.listItem}>
            <TouchableOpacity onPress={() => onPress(item._id)}>
              <Text>
                <Text style={styles.labelText}>Name: </Text>
                <Text style={styles.valueTextName}>{item.name}</Text>
              </Text>
              <Text>
                <Text style={styles.labelText}>Email: </Text>
                <Text style={styles.valueTextEmail}>{item.email}</Text>
              </Text>
              <Text>
                <Text style={styles.labelText}>Role: </Text>
                <Text style={styles.valueTextRole}>{item.role}</Text>
              </Text>
            </TouchableOpacity>
          </View>
        );
      }}
      keyExtractor={item => item._id}
    />
  );
};

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 3,
    marginTop: 5,
    marginStart: 5,
    marginEnd: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  labelText: {
    fontWeight: 'bold',
  },
  valueTextName: {
    marginLeft: 5,
    color: ColorPalette.PINK,
  },
  valueTextEmail: {
    marginLeft: 5,
    color: ColorPalette.GREEN,
  },
  valueTextRole: {
    marginLeft: 5,
    color: ColorPalette.PURPLE,
  },
});
export default UserList;

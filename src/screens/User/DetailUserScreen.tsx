import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import tokenSession from '../../utils/EncryptedStorage/tokenSession';
import userRouter from '../../api/user';
import {User} from '../../types';
import {Picker} from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/AntDesign';
import {ColorPalette} from '../../constants/styles/ColorPalette';
import SIZE from '../../constants/styles/Font';

interface props {
  navigation: any;
  route: any;
}

const DetailUserScreen = ({route, navigation}: props) => {
  const {key} = route.params;
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState('');
  const [name, setName] = useState('');
  const [isEdit, setIsEdit] = useState(false);

  const fetchUser = async () => {
    const token = await tokenSession.getToken();
    const res = await userRouter.getUserById(token, key);
    res.success ? setUser(res.data) : console.log(res.error);
  };

  const fetchStatus = async () => {
    const token = await tokenSession.getToken();
    const res = await userRouter.updateUser(token, key, name, role);
    res.success ? setIsEdit(false) : console.log(res.error);
  };

  const fetchDeleteUser = async () => {
    const token = await tokenSession.getToken();
    const res = await userRouter.delUser(token, key);
    res.success ? navigation.goBack() : console.log(res.error);
  };

  const setValue = () => {
    setName(user?.name as string);
    setRole(user?.role as string);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  useEffect(() => {
    setValue();
  }, [user]);

  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleSave = () => {
    fetchStatus();
    navigation.goBack();
    setIsEdit(false);
  };

  const handleCancel = () => {
    setValue();
    setIsEdit(false);
  };
  const handleDelete = () => {
    fetchDeleteUser();
  };

  return (
    <View style={styles.container}>
      {user ? (
        <>
          <View style={styles.label}>
            <Text style={styles.labelText}>Name:</Text>
            <TextInput
              value={name}
              onChangeText={text => setName(text)}
              editable={isEdit}
              style={styles.valueText}></TextInput>
          </View>
          <View style={styles.label}>
            <Text style={styles.labelText}>Email:</Text>
            <Text style={styles.valueText}>{user?.email}</Text>
          </View>
          <Picker
            selectedValue={role}
            enabled={isEdit}
            onValueChange={itemValue => {
              setRole(itemValue);
            }}>
            <Picker.Item label="Admin" value="admin" />
            <Picker.Item label="User" value="user" />
          </Picker>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={isEdit ? handleSave : handleEdit}
              style={[styles.button, {borderColor: ColorPalette.BLUE}]}>
              <Text style={[styles.buttonText, {color: ColorPalette.BLUE}]}>
                {isEdit ? 'Save' : 'Edit'}
              </Text>
              <Icon
                name={isEdit ? 'save' : 'edit'}
                size={22}
                color={ColorPalette.BLUE}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={isEdit ? handleCancel : handleDelete}
              style={[styles.button, {borderColor: ColorPalette.RED}]}>
              <Text style={[styles.buttonText, {color: ColorPalette.RED}]}>
                {isEdit ? 'Cancel' : 'Delete'}
              </Text>
              <Icon
                name={isEdit ? 'close' : 'delete'}
                size={22}
                color={ColorPalette.RED}
              />
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <Text style={styles.loadingText}>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorPalette.WHITE,
    padding: 15,
    borderRadius: 10,
    shadowColor: ColorPalette.SHADOW,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    flex: 1,
  },
  content: {
    flex: 1,
  },
  label: {
    borderWidth: 1,
    borderColor: ColorPalette.LIGHT_GRAY,
    borderRadius: 5,
    padding: 5,
    marginVertical: 5,
  },
  labelText: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: SIZE.MEDIUM,
  },
  valueText: {
    color: '#555',
    fontSize: SIZE.MEDIUM,
  },
  buttonContainer: {
    flexDirection: 'row',

    backgroundColor: ColorPalette.WHITE,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderTopColor: ColorPalette.LIGHT_GRAY,
    marginBottom: 10,
  },
  button: {
    flex: 1,
    backgroundColor: ColorPalette.WHITE,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor: ColorPalette.BLUE_BACKGROUND,
    borderWidth: 1,
    marginHorizontal: 3,
  },
  buttonText: {
    color: ColorPalette.BLUE_BACKGROUND,
    fontSize: SIZE.MEDIUM,
    fontWeight: 'bold',
  },
  loadingText: {
    fontStyle: 'italic',
    fontSize: SIZE.LARGE,
  },
});

export default DetailUserScreen;

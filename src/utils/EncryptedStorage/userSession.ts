import EncryptedStorage from 'react-native-encrypted-storage';
import {User} from '../../types/index';
import auth from '../../api/auth';

const storeUser = async (token: string) => {
  const res = await auth.info(token);
  if (res.success) {
    await EncryptedStorage.setItem('user', JSON.stringify(res.data));
  }
};

const getUser = async () => {
  const user = await EncryptedStorage.getItem('user');
  return user ? (JSON.parse(user) as User) : null;
};

const removeUser = async () => {
  await EncryptedStorage.removeItem('user');
};

export default {
  storeUser,
  getUser,
  removeUser,
};

import EncryptedStorage from 'react-native-encrypted-storage';

const storeToken = async (token: string) => {
  await EncryptedStorage.setItem('token', token);
};

const getToken = async () => {
  return (await EncryptedStorage.getItem('token')) as string;
};

const removeToken = async () => {
  await EncryptedStorage.removeItem('token');
};

export default {
  storeToken,
  getToken,
  removeToken,
};

import axios from 'axios';
import Config from 'react-native-config';

const api = axios.create({
  baseURL: Config.API_URL,
});

const getListUser = async (token: string) => {
  const response = await api.get('/api/v1/users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getUserById = async (token: string, id: string) => {
  const response = await api.get(`/api/v1/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const delUser = async (token: string, id: string) => {
  const response = await api.delete(`/api/v1/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const addUser = async (token: string) => {
  const response = await api.post(
    '/api/v1/users',
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

const updateUser = async (token: string) => {
  const response = await api.put(
    '/api/v1/users',
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

export default {getListUser, getUserById, delUser, addUser, updateUser};

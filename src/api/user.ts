import axios from 'axios';
import Config from 'react-native-config';

const api = axios.create({
  baseURL: Config.API_URL,
});

const getListUser = async (token: string) => {
  try {
    const response = await api.get('/api/v1/users', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    console.log('error', e);
  }
};

const getUserById = async (token: string, id: string) => {
  try {
    const response = await api.get(`/api/v1/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    console.log('error', e);
  }
};

const delUser = async (token: string, id: string) => {
  try {
    const response = await api.delete(`/api/v1/users/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    console.log('error', e);
  }
};

const addUser = async (token: string) => {
  try {
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
  } catch (e) {
    console.log('error', e);
  }
};

const updateUser = async (
  token: string,
  id: string,
  name: string,
  role: string,
) => {
  try {
    const response = await api.put(
      `/api/v1/users/${id}`,
      {
        name: name,
        role: role,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (e) {
    console.log('error', e);
  }
};

export default {getListUser, getUserById, delUser, addUser, updateUser};

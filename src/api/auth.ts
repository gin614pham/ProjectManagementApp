import axios from 'axios';
import Config from 'react-native-config';

const api = axios.create({
  baseURL: Config.API_URL,
});
/**
 * Registers a user with the given name, email, and password.
 *
 * @param {string} name - The name of the user.
 * @param {string} email - The email of the user.
 * @param {string} password - The password of the user.
 * @return {Promise<any>} The response data from the API call.
 */
const register = async (name: string, email: string, password: string) => {
  try {
    const response = await api.post('/api/v1/auth/register', {
      name,
      email,
      password,
    });
    return response.data;
  } catch (e) {
    console.log('error', e);
  }
};

/**
 * Logs in a user with the provided email and password.
 *
 * @param {string} email - The user's email.
 * @param {string} password - The user's password.
 * @return {Promise<any>} - A promise that resolves to the user's data.
 */
const login = async (email: string, password: string) => {
  try {
    const response = await api.post('/api/v1/auth/login', {
      email,
      password,
    });

    return response.data;
  } catch (e) {
    console.log('error', e);
  }
};

const info = async (token: string) => {
  try {
    const response = await api.get('/api/v1/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (e) {
    console.log('error', e);
  }
};

const forgotPassword = async (email: string) => {
  try {
    const response = await api.post('/api/v1/auth/forgotpassword', {
      email,
    });
    return response.data;
  } catch (e) {
    console.log('error', e);
  }
};

const resetPassword = async (URL: string, password: string) => {
  try {
    const response = await api.post(URL, {
      password: password,
    });
    return response.data;
  } catch (e) {
    console.log('error', e);
  }
};

export default {
  register,
  login,
  info,
  forgotPassword,
  resetPassword,
};

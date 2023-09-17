import axios from 'axios';
import Config from 'react-native-config';

const api = axios.create({
  baseURL: Config.API_URL,
});

const getListProject = async (token: string) => {
  const response = await api.get('/api/v1/projects', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getProjectById = async (token: string, id: string) => {
  const response = await api.get(`/api/v1/projects/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const delProject = async (token: string, id: string) => {
  const response = await api.delete(`/api/v1/projects/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const addProject = async (
  token: string,
  name: string,
  description: string,
  customer: string,
  skills: string[],
  assignees: string[],
) => {
  try {
    const response = await api.post(
      '/api/v1/projects',
      {
        name,
        description,
        customer,
        skills,
        assignees,
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

const updateProject = async (token: string, id: string, status: string) => {
  const response = await api.put(
    `/api/v1/projects/${id}`,
    {
      status: status,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
};

export default {
  getListProject,
  getProjectById,
  delProject,
  addProject,
  updateProject,
};

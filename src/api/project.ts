import axios, {AxiosError} from 'axios';
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
    if (axios.isAxiosError(e)) {
      const axiosErr = e as AxiosError;
      return axiosErr.message;
    } else {
      return 'An unexpected error occurred.';
    }
  }
};

const updateProject = async (
  token: string,
  id: string,
  status: string,
  description: string,
  skills: string[],
  assignees: string[],
) => {
  const response = await api.put(
    `/api/v1/projects/${id}`,
    {
      description: description,
      skills: skills,
      assignees: assignees,
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

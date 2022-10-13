import axios from "axios";
import { API_TESTING_URL } from "./config";
axios.defaults.withCredentials = true;

export const postAPI = async (url: string, post: object, token?: string) => {
  const res = await axios.post(`${API_TESTING_URL}/api/${url}`, post, {
    headers: { Authorization: token },
  });

  return res;
};

export const getAPI = async (url: string, token?: string) => {
  const res = await axios.get(`${API_TESTING_URL}/api/${url}`, {
    headers: { Authorization: token },
  });

  return res;
};

export const patchAPI = async (url: string, post: object, token?: string) => {
  const res = await axios.patch(`${API_TESTING_URL}/api/${url}`, post, {
    headers: { Authorization: token },
  });

  return res;
};

export const putAPI = async (url: string, post: object, token?: string) => {
  const res = await axios.put(`${API_TESTING_URL}/api/${url}`, post, {
    headers: { Authorization: token },
  });
  return res;
};

export const deleteAPI = async (url: string, token?: string) => {
  const res = await axios.delete(`${API_TESTING_URL}/api/${url}`, {
    headers: { Authorization: token },
  });

  return res;
};

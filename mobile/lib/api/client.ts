import axios from "axios";

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ?? "http://192.168.0.200:8000/api/";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

let currentAuthToken: string | null = null;

apiClient.interceptors.request.use(
  (config) => {
    if (currentAuthToken) {
      config.headers.Authorization = `Bearer ${currentAuthToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export const setAuthToken = (token: string | null) => {
  currentAuthToken = token;

  if (token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
    return;
  }

  delete apiClient.defaults.headers.common.Authorization;
};

export { apiClient };

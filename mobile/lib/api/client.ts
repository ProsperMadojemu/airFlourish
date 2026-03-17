import axios from "axios";

export const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ?? "http://192.168.0.200:8000/api/";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

let currentAuthToken: string | null = null;
let refreshInFlight: Promise<string | null> | null = null;

type AuthHandlers = {
  onRefreshAccessToken?: () => Promise<string | null>;
  onAuthFailure?: () => void | Promise<void>;
};

let authHandlers: AuthHandlers = {};

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

export const configureAuthHandlers = (handlers: AuthHandlers) => {
  authHandlers = handlers;
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error?.config as {
      _retry?: boolean;
      url?: string;
      headers?: Record<string, string>;
    };

    const status = error?.response?.status;
    const requestUrl = originalRequest?.url ?? "";
    const isAuthEndpoint =
      requestUrl.includes("token/") || requestUrl.includes("users/logout/");

    if (status !== 401 || !originalRequest || originalRequest._retry || isAuthEndpoint) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (!authHandlers.onRefreshAccessToken) {
      await authHandlers.onAuthFailure?.();
      return Promise.reject(error);
    }

    try {
      if (!refreshInFlight) {
        refreshInFlight = authHandlers.onRefreshAccessToken();
      }

      const nextToken = await refreshInFlight;
      refreshInFlight = null;

      if (!nextToken) {
        await authHandlers.onAuthFailure?.();
        return Promise.reject(error);
      }

      originalRequest.headers = originalRequest.headers ?? {};
      originalRequest.headers.Authorization = `Bearer ${nextToken}`;
      return apiClient(originalRequest);
    } catch (refreshError) {
      refreshInFlight = null;
      await authHandlers.onAuthFailure?.();
      return Promise.reject(refreshError);
    }
  },
);

export { apiClient };

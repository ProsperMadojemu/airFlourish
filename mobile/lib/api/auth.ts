import { apiClient } from "@/lib/api/client";
import { AuthSession, User, RegisterPayload } from "@/lib/types/auth";
import { LoginSchema } from "../validators/auth";

type RefreshSession = {
  access: string;
};

export const loginRequest = async (payload: LoginSchema) => {
  const { email, password } = payload;
  const response = await apiClient.post<AuthSession>("token/", { email, password });
  return response.data;
};

export const registerRequest = async (payload: RegisterPayload) => {
  const response = await apiClient.post("users/register/", payload);
  return response.data;
};

export const fetchProfileRequest = async () => {
  const response = await apiClient.get<User>("users/profile/");
  return response.data;
};

export const logoutRequest = async (refreshToken?: string | null) => {
  if (!refreshToken) return;
  await apiClient.post("users/logout/", { refresh: refreshToken });
};

export const refreshTokenRequest = async (refreshToken: string) => {
  const response = await apiClient.post<RefreshSession>("token/refresh/", {
    refresh: refreshToken,
  });
  return response.data;
};

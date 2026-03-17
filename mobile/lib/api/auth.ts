import { apiClient } from "@/lib/api/client";
import { AuthSession, AuthUser, RegisterPayload } from "@/lib/types/auth";

export const loginRequest = async (email: string, password: string) => {
  const response = await apiClient.post<AuthSession>("token/", { email, password });
  return response.data;
};

export const registerRequest = async (payload: RegisterPayload) => {
  const response = await apiClient.post("users/register/", payload);
  return response.data;
};

export const fetchProfileRequest = async () => {
  const response = await apiClient.get<AuthUser>("users/profile/");
  return response.data;
};

export const logoutRequest = async (refreshToken?: string | null) => {
  if (!refreshToken) return;
  await apiClient.post("users/logout/", { refresh: refreshToken });
};

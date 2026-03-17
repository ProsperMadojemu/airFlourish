export type AuthUser = {
  email: string;
  first_name?: string;
  last_name?: string;
  user_type?: string;
  country?: { code: string; name: string } | null;
  phone_number?: string | null;
  church?: string | null;
  zone?: string | null;
};

export type AuthSession = AuthUser & {
  access: string;
  refresh?: string;
};

export type RegisterPayload = {
  email: string;
  password: string;
  first_name?: string;
  last_name?: string;
  user_type?: string;
};

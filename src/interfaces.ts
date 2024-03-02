import { UserRole } from "./enums";

export interface SignInData {
  email: string;
  password: string;
}
export interface SignUpData {
  email: string;
  password: string;
  nickname: string;
  role: UserRole;
}

export interface AuthInputErrors {
  nickname?: boolean;
  email: boolean;
  password: boolean;
}

export interface AuthResponse {
  user_id: string;
  access_token: string;
  refresh_token: string;
}

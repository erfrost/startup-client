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

export interface UserInfo {
  user_id: string;
  avatar_url: string;
  nickname: string;
  online_status: boolean;
  last_online_date: string;
}

export interface MessageFile {
  name: string;
  type: string;
  url: string;
}

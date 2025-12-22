export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
  role: string;
}

export interface LoginError {
  email?: string;
  password?: string;
  general?: string;
}

export interface AdminRole {
  value: string;
  label: string;
  description: string;
}

export interface MockCredentials {
  email: string;
  password: string;
  role: string;
  name: string;
}
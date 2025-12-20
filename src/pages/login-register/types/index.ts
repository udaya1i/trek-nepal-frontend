export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  experienceLevel: string;
  agreeToTerms: boolean;
}

export interface FormErrors {
  [key: string]: string;
}

export interface SocialLoginProvider {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface ExperienceLevel {
  value: string;
  label: string;
  description: string;
}
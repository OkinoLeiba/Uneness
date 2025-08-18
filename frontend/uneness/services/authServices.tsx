import { api } from './api';

// Define TypeScript interfaces for request/response payloads
// Validate backend responses with runtime checks??
export interface AuthPayload {
    first_name?: string;
    last_name?: string;
    username?: string;
    email: string;
    password: string;
    password2?: string;
}

export const signup = async (data: AuthPayload) => {
  return api.post('user/signup/', data);
};

export const login = async (data: AuthPayload) => {
  return api.post('user/login/', data);
};

export const logout = async () => {
  return api.post('user/logout/');
};

export const getCurrentUser = async () => {
  return api.get('user/info/');
};

export const updateProfile = async (data: Partial<AuthPayload>) => {
  return api.put('user/info/', data);
};
// TODO: validation on the frontend or backend??
export const changePassword = async (data: { old_password: string; new_password: string }) => {
  return api.put('user/change-password/', data);
};
/*
The instance that invokes the method will need to pass token 
token will be gotten from local storage or cookie
TODO: consider passing email as well
*/
export const verifyEmail = async (token: string) => {
  api.post('user/verify-email/', token);
};


// export const signup = (data: AuthPayload) => api.post('signup/', data);
// export const login = (data: AuthPayload) => api.post('login/', data);
// export const logout = () => api.post('logout/');
// export const getCurrentUser = () => api.get('user/');
// export const updateProfile = (data: Partial<AuthPayload>) => api.put('user/', data);
// export const changePassword = (data: { old_password: string; new_password: string }) =>
//   api.put('user/change-password/', data);
// export const verifyEmail = (token: string) => api.post('verify-email/', { token})
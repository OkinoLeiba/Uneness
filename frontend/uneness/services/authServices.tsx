
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

// approach to add config and authorization after instance is made
// axiosConfig = {
  // 'Authorization' :
// }



export const signup = async (data: AuthPayload) => {
  return api.post('user/signup/', data);
};

export const login = async (data: AuthPayload) => {
  // Alter defaults after instance has been created
  // Token will be used for select methods
  api.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');
  return api.post('user/login/', data);
};

export const logout = async () => {
  // Alter defaults after instance has been created
  // Token will be used for select methods
  api.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');
  console.log(sessionStorage.getItem('token'))
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
  // Alter defaults after instance has been created
  api.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');
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

export const csrfTokenRequest = async () => {
  return api.get('user/csrf/')
}

// export const signup = (data: AuthPayload) => api.post('user/signup/', data);
// export const login = (data: AuthPayload) => api.post('user/login/', data);
// export const logout = () => api.post('user/logout/');
// export const getCurrentUser = () => api.get('user/');
// export const updateProfile = (data: Partial<AuthPayload>) => api.put('user/', data);
// export const changePassword = (data: { old_password: string; new_password: string }) =>
//   api.put('user/change-password/', data);
// export const verifyEmail = (token: string) => api.post('user/verify-email/', { token})
// export const csrfToken = () => api.get('user/csrf');
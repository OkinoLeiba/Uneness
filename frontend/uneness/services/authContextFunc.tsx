import React, { createContext, useEffect, useState } from 'react';
import { signup, login, logout, getCurrentUser, updateProfile, changePassword, verifyEmail, csrfTokenRequest } from './authServices';
import type { AxiosResponse } from 'axios';


interface User {
  username: string;
  email: string;
}

interface AuthPayload {
    first_name?: string;
    last_name?: string;
    email: string;
    password: string;
    password2?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AxiosResponse>;
  signup: (email: string, first_name: string, last_name: string, password: string, password2: string) => Promise<AxiosResponse>;
  logout: () => Promise<void>;
  updateProfile: (data: AuthPayload) => Promise<void>;
  changePassword: (old_password: string, new_password: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  getCurrentUser: () => Promise<AxiosResponse>;
  csrfTokenRequest: () => Promise<AxiosResponse>;
}



const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchUser();
  }, []);

  // if user exists
  const fetchUser = async () => {
    try {
      const response = await getCurrentUser();
      setUser(response.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    const response = await login({ email, password });
    setUser(response.data.user);
    return response;
  };

  const handleSignup = async (email: string, first_name: string, last_name: string, password: string, password2: string) => {
    const response = await signup({ email, first_name, last_name, password, password2 });
    setUser(response.data.user);
    return response;
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
  };

  const handleUpdateProfile = async (data: Partial<AuthPayload>) => {
    const response = await updateProfile(data);
    setUser(response.data);

  };

  const handleChangePassword = async (old_password: string, new_password: string) => {
    await changePassword({ old_password, new_password });
  };

  const handleVerifyEmail = async (token: string) => {
    await verifyEmail(token);
  };

  const handleCurrentUser = async () => {
    const response = await getCurrentUser();
    setUser(response.data);
    return response;
  };

  const handleCsrfRequest = async () => {
    const response = await csrfTokenRequest();
    return response;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login: handleLogin,
        signup: handleSignup,
        logout: handleLogout,
        updateProfile: handleUpdateProfile,
        changePassword: handleChangePassword,
        verifyEmail: handleVerifyEmail,
        getCurrentUser: handleCurrentUser,
        csrfTokenRequest: handleCsrfRequest,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};



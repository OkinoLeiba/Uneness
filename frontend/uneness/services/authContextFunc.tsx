import React, { createContext, useEffect, useState } from 'react';
import { signup, login, logout, getCurrentUser, updateProfile, changePassword, verifyEmail, csrfTokenRequest } from './authServices';
import type { AxiosResponse } from 'axios';

/**
 * @typedef {Object} User
 * @description Basic user identity information used in authentication context.
 *
 * @property {string} username - Unique identifier for the user.
 * @property {string} email - Email address associated with the user account.
 *
 * @author Okino Kamali Leiba
 * @version 1.0
 * @since 2025-08-21
 */

/**
 * @typedef {Object} AuthPayload
 * @description Payload structure for user registration and profile updates.
 *
 * @property {string} [first_name] - Optional first name of the user.
 * @property {string} [last_name] - Optional last name of the user.
 * @property {string} email - Email address used for authentication or updates.
 * @property {string} [password] - Optional password for login or profile change.
 * @property {string} [password2] - Optional confirmation password for validation.
 *
 * @author Okino Kamali Leiba
 * @version 1.0
 * @since 2025-08-21
 */

/**
 * @typedef {Object} AuthContextType
 * @description Context interface for managing authentication state and operations.
 *
 * State
 * @property {User|null} user - Currently authenticated user or null if not logged in.
 * @property {boolean} loading - Indicates whether authentication operations are in progress.
 *
 * Methods
 * @property {function(string, string): Promise<AxiosResponse>} login - Authenticates a user with email and password.
 * @property {function(string, string, string, string, string): Promise<AxiosResponse>} signup - Registers a new user with full credentials.
 * @property {function(): Promise<void>} logout - Logs out the current user.
 * @property {function(AuthPayload): Promise<void>} updateProfile - Updates user profile with provided data.
 * @property {function(string, string): Promise<void>} changePassword - Changes the user's password using old and new values.
 * @property {function(string): Promise<void>} verifyEmail - Verifies the user's email using a token.
 * @property {function(): Promise<AxiosResponse>} getCurrentUser - Retrieves the current authenticated user from the server.
 * @property {function(): Promise<AxiosResponse>} csrfTokenRequest - Requests a CSRF token for secure form submissions.
 *
 * @author Okino Kamali Leiba
 * @version 1.0
 * @since 2025-08-21
 */

interface User {
  username: string;
  email: string;
}

interface AuthPayload {
    first_name?: string;
    last_name?: string;
    email: string;
    password?: string;
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



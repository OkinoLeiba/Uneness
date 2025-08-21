import React, { createContext } from 'react';
import { signup, login, logout, getCurrentUser, updateProfile, changePassword, verifyEmail, csrfTokenRequest } from './authServices';
import type { AxiosResponse } from 'axios';

/**
 * @typedef {Object} AuthPayload
 * @description Payload for user authentication and profile updates.
 *
 * @property {string} [first_name] - Optional first name of the user.
 * @property {string} [last_name] - Optional last name of the user.
 * @property {string} email - Email address used for login or registration.
 * @property {string} [password] - Optional password for authentication or update.
 * @property {string} [password2] - Optional confirmation password for validation.
 *
 * @author Okino Kamali Leiba
 * @version 1.0
 * @since 2025-08-21
 */

/**
 * @typedef {Object} AuthProviderProps
 * @description Props for the authentication provider component that wraps application children.
 *
 * @property {React.ReactNode} children - React child components rendered within the provider.
 *
 * @author Okino Kamali Leiba
 * @version 1.0
 * @since 2025-08-21
 */

/**
 * @typedef {Object} User
 * @description Basic user information stored in authentication context.
 *
 * @property {string} username - Unique username of the authenticated user.
 * @property {string} email - Email address associated with the user account.
 *
 * @author Okino Kamali Leiba
 * @version 1.0
 * @since 2025-08-21
 */

/**
 * @typedef {Object} AuthProviderState
 * @description Internal state for managing authentication context.
 *
 * @property {User|null} user - Currently authenticated user or null if not logged in.
 * @property {boolean} loading - Indicates whether authentication-related operations are in progress.
 *
 * @author Okino Kamali Leiba
 * @version 1.0
 * @since 2025-08-21
 */

/**
 * @typedef {Object} AuthContextType
 * @description Context interface for authentication operations and user state.
 *
 * @property {User|null} user - Currently authenticated user or null.
 * @property {boolean} loading - Indicates if authentication operations are currently loading.
 *
 * Authentication Methods
 * @property {function(string, string): Promise<AxiosResponse>} login - Logs in a user with email and password.
 * @property {function(string, string, string, string, string): Promise<AxiosResponse>} signup - Registers a new user with full credentials.
 * @property {function(): Promise<void>} logout - Logs out the current user.
 * @property {function(AuthPayload): Promise<void>} updateProfile - Updates user profile with provided data.
 * @property {function(string, string): Promise<AxiosResponse>} changePassword - Changes the user's password.
 * @property {function(string): Promise<void>} verifyEmail - Verifies the user's email using a token.
 * @property {function(): Promise<AxiosResponse>} getCurrentUser - Retrieves the current authenticated user.
 * @property {function(): Promise<AxiosResponse>} csrfTokenRequest - Requests a CSRF token for secure operations.
 *
 * @author Okino Kamali Leiba
 * @version 1.0
 * @since 2025-08-21
 */

interface AuthPayload {
  first_name?: string;
  last_name?: string;
  email: string;
  password?: string;
  password2?: string;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

interface User {
  username: string;
  email: string;
}

interface AuthProviderState {
  user: User | null;
  loading: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<AxiosResponse>; 
  signup: (email: string, first_name: string, last_name: string, password: string, password2: string) => Promise<AxiosResponse>;
  logout: () => Promise<void>;
  updateProfile: (data: AuthPayload) => Promise<void>;
  changePassword: (old_password: string, new_password: string) => Promise<AxiosResponse>;
  verifyEmail: (token: string) => Promise<void>;
  getCurrentUser: () => Promise<AxiosResponse>;
  csrfTokenRequest: () => Promise<AxiosResponse>;
}


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export class AuthProvider extends React.Component<AuthProviderProps, AuthProviderState> {
  constructor(props: AuthProviderProps) {
    super(props);
    this.state = {
      user: null,
      loading: true,
    };
  }

  async componentDidMount() {
    await this.fetchUser();
  }
  // if user exists
  fetchUser = async () => {
    try {
      const response = await getCurrentUser();
      this.setState({ user: response.data });
    } catch {
      this.setState({ user: null });
    } finally {
      this.setState({ loading: false });
    }
  };

  

  login = async (email: string, password: string) => {
    const response = await login({ email, password });
    this.setState({ user: response.data.user });
    return response;
  };

  signup = async (email: string, first_name: string, last_name: string, password: string, password2: string) => {
    const response = await signup({ email, first_name, last_name, password, password2 });
    this.setState({ user: response.data.user });
    return response;
  };

  logout = async () => {
    await logout();
    this.setState({ user: null });
  };

  updateProfile = async (data: Partial<AuthPayload>) => {
    const response = await updateProfile(data);
    this.setState({ user: response.data });
  };

  changePassword = async (old_password: string, new_password: string) => {
    return await changePassword({ old_password, new_password });
  };

  verifyEmail = async (token: string) => {
    await verifyEmail(token);
  };

  getCurrentUser = async () => {
    const response = await getCurrentUser();
    this.setState({ user: response.data });
    return response;
  }

  csrfTokenRequest = async () => {
    const response = await csrfTokenRequest();
    return response;
  }

  render() {
    const { user, loading } = this.state;
    const { children } = this.props;

    return (
      <AuthContext.Provider
        value={{
          user,
          loading,
          login: this.login,
          signup: this.signup,
          logout: this.logout,
          updateProfile: this.updateProfile,
          changePassword: this.changePassword,
          verifyEmail: this.verifyEmail,
          getCurrentUser: this.getCurrentUser,
          csrfTokenRequest: this.csrfTokenRequest,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}

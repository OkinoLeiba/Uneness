import React, { Component, createContext } from 'react';
import { signup, login, logout, getCurrentUser, updateProfile, changePassword, verifyEmail } from './authServices';
import type { AxiosPromise, AxiosResponse } from 'axios';

interface AuthPayload {
  first_name?: string;
  last_name?: string;
  email: string;
  password: string;
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
}


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export class AuthProvider extends Component<AuthProviderProps, AuthProviderState> {
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
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}

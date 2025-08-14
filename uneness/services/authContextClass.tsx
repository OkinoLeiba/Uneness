import React, { Component, createContext } from 'react';
import { signup, login, logout, getCurrentUser, updateProfile, changePassword, verifyEmail } from './authServices';

interface AuthPayload {
    username?: string;
    email: string;
    password: string;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

interface User {
  id: number;
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
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: AuthPayload) => Promise<void>;
  changePassword: (old_password: string, new_password: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
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
  };

  signup = async (email: string, username: string, password: string) => {
    const response = await signup({ email, username, password });
    this.setState({ user: response.data.user });
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
    await changePassword({ old_password, new_password });
  };

  verifyEmail = async (token: string) => {
    await verifyEmail(token);
  };

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
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}

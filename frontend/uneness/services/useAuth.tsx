import { useContext } from 'react';
import { AuthContext } from './authContextClass';

// use in functional component after probably refactoring
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

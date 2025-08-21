import { type JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../services/useAuth';

/**
 * @typedef {Object} Props
 * @description Props for a React component that wraps and renders a single child element.
 *
 * React Composition
 * @property {JSX.Element} children - A single React element to be rendered inside the component.
 *
 * @author Okino Kamali Leiba
 * @version 1.0
 * @since 2025-08-21
 */

interface Props {
  children: JSX.Element;
}

const PrivateRoute: React.FC<Props> = ({ children }): JSX.Element => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to='/uneness/components/LogIn' replace />;

    return children;
};

export default PrivateRoute;

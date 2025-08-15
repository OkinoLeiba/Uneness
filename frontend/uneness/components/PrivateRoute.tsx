import { type JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../services/useAuth';

interface Props {
  children: JSX.Element;
}

const PrivateRoute: React.FC<Props> = ({ children }): JSX.Element => {
    const { user, loading } = useAuth();

    if (loading) return <div>Loading...</div>;
    if (!user) return <Navigate to="/uneness/components/LogIn" replace />;

    return children;
};

export default PrivateRoute;

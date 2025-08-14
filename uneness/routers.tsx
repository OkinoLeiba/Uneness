import { createBrowserRouter } from 'react-router-dom';
import App from './src/App';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import Login from './components/LogIn';
import Signup from './components/SignUp';
import Dashboard from './components/DashBoard';
import PrivateRoute from './components/PrivateRoute';


export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    children: [
      // { index: true, path: '/hompage', element: <HomePage /> },
      // {path: '/homepage', element: <HomePage />},
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      {
        path: 'dashboard',
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

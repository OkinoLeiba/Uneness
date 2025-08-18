import { createBrowserRouter } from 'react-router-dom';
import App from './src/App';
import Layout from '../uneness/components/LayOut';
import HomePage from './pages/HomePage';
import JourneyPage from './pages/JourneyPage';
import PillarsPage from './pages/PillarsPage';
import TestPage from './pages/testpage';
import Login from './components/LogIn';
import Signup from './components/SignUp';
import Dashboard from './components/DashBoard';
import PrivateRoute from './components/PrivateRoute';
import ErrorPage from './pages/ErrorPage';



export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, path: 'homepage', element: <HomePage /> },
      // @ts-expect-error style context not required
      { path: 'login', element: <Login /> }, 
      // @ts-expect-error style context not required
      { path: 'signup', element: <Signup /> },
      { path: 'journey', element: <JourneyPage /> },
      { path: 'pillars', element: <PillarsPage /> },
      // { path: 'test', element: <TestPage />},
      {
        path: 'dashboard',
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
    ],
    errorElement: <ErrorPage/>
  },
]);

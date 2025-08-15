import { RouterProvider, BrowserRouter, Route, Routes } from 'react-router-dom';
import { router } from '../routers';
import { AuthProvider } from '../services/authContextClass';
import './App.css';

// import reactLogo from './assets/icons/react.svg';
// import viteLogo from '/vite.svg';
// 
import Login from '../components/LogIn';
import Signup from '../components/SignUp';
import ExercisePage from '../pages/ExercisePage';
// import Layout from '../components/LayOut';
// import TestPage from '../pages/testpage';
// import HomePage from '../pages/HomePage';
//import PillarPage from '../pages/PillarsPage';


function App() {
  

  return (
      //<BrowserRouter>
      //  <Routes>
      //    <Route path='/' element={<ExercisePage  />} />
      //    <Route path='/signup' element={<Signup />} />
      //    <Route path='/login' element={<Login />} />
      //  </Routes>
      //</BrowserRouter>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider> 
   
  )
}

export default App

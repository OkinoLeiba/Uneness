import { RouterProvider } from 'react-router-dom';
import { router } from '../routers';
import { AuthProvider } from '../services/authContextClass';
import './App.css';


function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider> 
   
  )
}

export default App

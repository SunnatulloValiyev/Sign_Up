import React from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import MainLayout from './layouts/MainLayout';
import 'react-toastify/dist/ReactToastify.css'; 
import Create from './pages/Create';
import ProtectedRoute from './components/ProtectedRoutes';
import { ToastContainer, toast  } from 'react-toastify'; 

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/register" />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/main",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "create",
        element: <ProtectedRoute><Create /></ProtectedRoute>,
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer /> 
    </AuthProvider>
  );
}

export default App;

import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';
import { useAuth } from '../context/auth-context';

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
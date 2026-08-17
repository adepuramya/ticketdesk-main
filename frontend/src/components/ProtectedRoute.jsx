// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';
// import { LoadingSpinner } from './LoadingSpinner';

// export const ProtectedRoute = () => {
//   const { loading } = useAuth();

//   if (loading) {
//     return <LoadingSpinner />;
//   }

//   return <Outlet />;
// };
 import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LoadingSpinner } from './LoadingSpinner';

export const ProtectedRoute = () => {
  const { loading, user } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
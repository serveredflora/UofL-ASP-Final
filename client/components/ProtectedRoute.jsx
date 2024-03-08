import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Check authentication status and role.
  const isAuthenticated = localStorage.getItem('userToken') ? true : false;
  const userRole = localStorage.getItem('userRole');

  if (!isAuthenticated) {
    // User not authenticated. Redirect them to the login page.
    return <Navigate to="/login" replace />;
  }

  if (userRole !== 'member') {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;

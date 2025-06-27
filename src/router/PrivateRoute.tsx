import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import type { UserProfile } from '../types/user';

interface PrivateRouteProps {
  allowedRoles?: UserProfile['role'][];
  loginPath?: string; // Path to redirect if not authenticated
  unauthorizedPath?: string; // Path to redirect if not authorized (role mismatch)
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  allowedRoles,
  loginPath = '/login', // Default login path
  unauthorizedPath = '/', // Default path if role is not authorized
}) => {
  const { isAuthenticated, loading, userRole } = useAuth();
  const location = useLocation();

  if (loading) {
    // You can render a loading spinner here if desired
    return <div>Loading authentication status...</div>;
  }

  if (!isAuthenticated) {
    // User not authenticated, redirect to login page
    // Pass the current location to redirect back after login
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  if (allowedRoles && allowedRoles.length > 0 && (!userRole || !allowedRoles.includes(userRole))) {
    // User is authenticated, but their role is not in allowedRoles
    return <Navigate to={unauthorizedPath} state={{ from: location }} replace />;
  }

  // User is authenticated and (if roles specified) authorized
  return <Outlet />; // Render the nested routes or child components
};

export default PrivateRoute;

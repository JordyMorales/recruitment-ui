import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { Role } from '../types/user';
import useAuth from '../hooks/useAuth';
import Login from '../pages/authentication/Login';
import AuthorizationRequired from '../pages/AuthorizationRequired';

interface Props {
  children: React.ReactNode;
  roles: Array<Role>;
}

const RoleBasedGuard: React.FC<Props> = ({ children, roles }) => {
  const location = useLocation();
  const { isAuthenticated, user } = useAuth();
  const [requestedLocation, setRequestedLocation] = useState(null);

  const userHasRequiredRole = user && roles.includes(user.role);

  if (!isAuthenticated) {
    if (location.pathname !== requestedLocation) setRequestedLocation(location.pathname);
    return <Login />;
  }
  if (!userHasRequiredRole) return <AuthorizationRequired />;

  if (requestedLocation && location.pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
};

export default RoleBasedGuard;

import React from 'react';
import { Role } from '../types/user';
import useAuth from '../hooks/useAuth';

interface Props {
  children: React.ReactNode;
  roles: Array<Role>;
}

const Guard: React.FC<Props> = ({ children, roles }) => {
  const { user } = useAuth();
  if (!roles) return <>{children}</>;
  const userHasRequiredRole = user && roles.includes(user.role);
  if (!userHasRequiredRole) return null;
  return <>{children}</>;
};

export default Guard;

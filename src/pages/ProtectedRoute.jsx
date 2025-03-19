import React from 'react';
import { useUser } from '../contexts/UserContext';
import { Navigate } from 'react-router';

export default function ProtectedRoute({ children, requireAdmin }) {
  const { user } = useUser();
  if (!user || (requireAdmin && !user.isAdmin)) {
    return <Navigate to='/' replace />;
  }
  return children;
}

import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import type { ReactNode } from 'react';

export interface ProtectedRouteProps {
  allow: Array<'STUDENT'|'STAFF'|'ADMIN'>;
  children?: ReactNode;
}

const ProtectedRoute = ({ allow,children }: ProtectedRouteProps) => {
  
  const { user, isAuthReady } = useAuth();
  const location = useLocation();

  if (!isAuthReady) return null; 

  
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  
  if (!allow.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children ? <>{children}</> :<Outlet/>
};

export default ProtectedRoute;

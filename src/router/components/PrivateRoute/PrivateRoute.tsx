 

import { Navigate } from "react-router";
import { useAuth } from "../../../context/auth/hooks/useAuth";

export type PrivateRouteProps = {
  children: JSX.Element;
};

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isUser, isLoading } = useAuth();

  if (!isUser && !isLoading) {
    return <Navigate to="/login" replace />;
  } else return children;
};

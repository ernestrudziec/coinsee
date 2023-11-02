/* eslint-disable @typescript-eslint/no-explicit-any */

import { Navigate } from "react-router";
import { useAuth } from "../../../context/auth/useAuth";

export type PrivateRouteProps = {
  children: JSX.Element;
};

export const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { currentUser } = useAuth();

  if (currentUser === null) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

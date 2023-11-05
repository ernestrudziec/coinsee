/* eslint-disable @typescript-eslint/no-explicit-any */

import { Navigate } from "react-router";
import { useAuth } from "../../../context/auth/useAuth";
import { PrivateRoutePath } from "../../routes";
import { Spin } from "antd";

export type PublicRouteProps = {
  children: JSX.Element;
};

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { currentUser } = useAuth();

  if (currentUser === undefined) {
    return <Spin size="large" />;
  }
  if (currentUser !== null && currentUser !== undefined) {
    return <Navigate to={PrivateRoutePath.DASHBOARD} replace />;
  }

  return children;
};

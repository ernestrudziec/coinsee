 

import { Navigate } from "react-router";
import { useAuth } from "../../../context/auth/hooks/useAuth";
import { PrivateRoutePath } from "../../routes";

export type PublicRouteProps = {
  children: JSX.Element;
  allowRedirect?: boolean;
};

export const PublicRoute = ({ children, allowRedirect }: PublicRouteProps) => {
  const { isUser } = useAuth();

  if (isUser && allowRedirect) {
    return <Navigate to={PrivateRoutePath.DASHBOARD} replace />;
  } else return children;
};

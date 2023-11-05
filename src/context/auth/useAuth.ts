import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  const user = authContext?.currentUser;

  return {
    currentUser: { email: user?.email, uid: user?.uid },
    ...authContext,
  };
};

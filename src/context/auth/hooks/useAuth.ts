import { useContext } from "react";
import { AuthContext } from "../AuthContext";
import { UserState } from "../constants";

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  const user = authContext?.currentUser;
  const userState = authContext?.userState;

  const isLoading = userState === UserState.LOADING;

  const isUser = user !== undefined && user !== null;

  return {
    currentUser: { email: user?.email, uid: user?.uid },
    isUser,
    userState,
    isLoading,
    ...authContext,
  };
};

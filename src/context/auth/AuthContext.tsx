/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";

export type AuthContextType = any;

export const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  signUp: async () => {},
  logOut: async () => {},
});

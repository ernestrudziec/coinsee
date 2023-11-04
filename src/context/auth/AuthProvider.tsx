import { useEffect, useState } from "react";
import {
  User,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "../../firebase/setup";
import { AuthContext } from "./AuthContext";
import { RequestStatus } from "./constants";
import { createUserProfile } from "../../firebase/api/createUserProfile";

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null | undefined>(
    undefined
  );

  const [signUpError, setSignUpError] = useState<unknown>(null);
  const [signUpStatus, setSignUpStatus] = useState<RequestStatus>(
    RequestStatus.IDLE
  );

  const [logInError, setLogInError] = useState<unknown>(null);
  const [logInStatus, setLogInStatus] = useState<RequestStatus>(
    RequestStatus.IDLE
  );

  const [logOutError, setLogOutError] = useState<unknown>(null);
  const [logOutStatus, setLogOutStatus] = useState<RequestStatus>(
    RequestStatus.IDLE
  );

  const signUp = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setSignUpStatus(RequestStatus.IDLE);

    try {
      setSignUpStatus(RequestStatus.PENDING);
      setSignUpError(null);

      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await createUserProfile({
        email,
        uid: credentials?.user?.uid,
      });

      setSignUpStatus(RequestStatus.SUCCESS);
    } catch (err) {
      setSignUpError((err as Error).message);
      setSignUpStatus(RequestStatus.ERROR);
    }
  };

  const logIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setLogInStatus(RequestStatus.IDLE);

    try {
      setLogInStatus(RequestStatus.PENDING);
      setLogInError(null);
      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, email, password);

      setLogInStatus(RequestStatus.SUCCESS);
    } catch (err) {
      setLogInError((err as Error).message);
      setLogInStatus(RequestStatus.ERROR);
    }
  };

  const logOut = async () => {
    setLogOutStatus(RequestStatus.IDLE);

    try {
      setLogOutStatus(RequestStatus.PENDING);
      setLogOutError(null);
      await signOut(auth);
      setLogOutStatus(RequestStatus.SUCCESS);
    } catch (err) {
      setLogOutError((err as Error).message);
      setLogOutStatus(RequestStatus.ERROR);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      user && setCurrentUser(user);
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    signUp: { execute: signUp, error: signUpError, status: signUpStatus },
    logIn: { execute: logIn, error: logInError, status: logInStatus },
    logOut: { execute: logOut, error: logOutError, status: logOutStatus },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

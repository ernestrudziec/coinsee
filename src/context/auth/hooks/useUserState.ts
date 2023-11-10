import { useEffect, useState } from "react";
import { UserState } from "../constants";

export const useUserState = ({ isCurrentUser }: { isCurrentUser: boolean }) => {
  const isUserExpected =
    window.localStorage.getItem("shouldExpectUser") === "true";

  const [userState, setUserState] = useState<UserState>(
    !isUserExpected ? UserState.GUEST : UserState.LOADING
  );

  const setIsUserExpected = (value: boolean) =>
    window.localStorage.setItem("shouldExpectUser", String(value));

  useEffect(() => {
    if (isCurrentUser) setUserState(UserState.LOGGED_IN);
    else if (isUserExpected) {
      setUserState(UserState.LOADING);
    } else {
      setUserState(UserState.GUEST);
    }
  }, [isUserExpected, isCurrentUser]);

  return {
    userState,
    setIsUserExpected,
  };
};

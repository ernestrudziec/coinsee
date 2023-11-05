/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../context/auth/useAuth";
import { getAllWallets } from "../../firebase/api/getAllWallets";

export const useWallets = () => {
  const { currentUser } = useAuth();

  const [wallets, setWallets] = useState<any>([]);

  const fetchWallets = useCallback(async () => {
    const wallets = await getAllWallets({ uid: currentUser?.uid });
    setWallets(wallets);
  }, [currentUser]);

  useEffect(() => {
    fetchWallets();
  }, [fetchWallets, currentUser]);

  return {
    wallets,
  };
};

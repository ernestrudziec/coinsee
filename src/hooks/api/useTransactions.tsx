/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../../context/auth/useAuth";
import { getAllTransactions } from "../../firebase/api/getAllTransactions";

export const useTransactions = () => {
  const { currentUser } = useAuth();

  const [transactions, setTransactions] = useState<any>([]);

  const fetchTransactions = useCallback(async () => {
    const Transactions = await getAllTransactions({ uid: currentUser.uid });
    setTransactions(Transactions);
  }, [currentUser]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions, currentUser]);

  return {
    transactions,
  };
};

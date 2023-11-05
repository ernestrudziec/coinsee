import { collection, query } from "firebase/firestore";
import { db } from "../setup";
import { getFirestoreData } from "../utils";

export type GetAllTransactions = {
  uid: string;
};
export const getAllTransactions = async ({ uid }: GetAllTransactions) => {
  try {
    const transactions = await getFirestoreData({
      query: query(collection(db, "users", uid, "transactions")),
    });

    return transactions;
  } catch (e) {
    console.log(e);
    return [];
  }
};

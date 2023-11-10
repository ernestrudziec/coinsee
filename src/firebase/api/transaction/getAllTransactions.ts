import { collection, query } from "firebase/firestore";
import { db } from "../../setup";
import { getFirestoreData } from "../../utils";

export type GetAllTransactions = {
  uid: string;
};
export const getAllTransactions = async ({ uid }: GetAllTransactions) => {
  try {
    const userTransactions = await getFirestoreData({
      query: query(collection(db, "users", uid, "transactions")),
    });

    return userTransactions;
  } catch (e) {
    console.log("Error getting all user transactions: ", e);
    return [];
  }
};

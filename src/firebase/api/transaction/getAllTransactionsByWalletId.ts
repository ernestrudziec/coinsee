import { collection, query, where } from "firebase/firestore";
import { db } from "../../setup";
import { getFirestoreData } from "../../utils";

export type GetAllTransactionsByWalletId = {
  uid: string;
  walletId: string;
};
export const getAllTransactionsByWalletId = async ({
  uid,
  walletId,
}: GetAllTransactionsByWalletId) => {
  try {
    const userTransactionsByWalletId = await getFirestoreData({
      query: query(
        collection(db, "users", uid, "transactions"),
        where("walletId", "==", walletId)
      ),
    });

    return userTransactionsByWalletId;
  } catch (e) {
    console.log("Error getting all user transactions by walletId: ", e);
    return [];
  }
};

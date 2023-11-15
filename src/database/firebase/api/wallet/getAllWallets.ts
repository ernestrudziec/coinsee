import { collection, query } from "firebase/firestore";
import { db } from "../../setup";
import { getFirestoreData } from "../../utils";

export type GetAllWallets = {
  uid: string;
};
export const getAllWallets = async ({ uid }: GetAllWallets) => {
  try {
    const wallets = await getFirestoreData({
      query: query(collection(db, "users", uid, "wallets")),
    });

    return wallets;
  } catch (e) {
    console.log("Error getting all wallets", e);
    return [];
  }
};

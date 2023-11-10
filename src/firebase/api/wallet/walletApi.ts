import { addTransactionToWallet } from "./addTransactionToWallet";
import { createWallet } from "./createWallet";
import { getAllWallets } from "./getAllWallets";
import { removeTransactionFromWallet } from "./removeTransactionFromWallet";

export const walletApi = {
  create: createWallet,
  getAll: getAllWallets,
  transaction: {
    add: addTransactionToWallet,
    remove: removeTransactionFromWallet,
  },
};

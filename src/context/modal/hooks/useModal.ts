/* eslint-disable @typescript-eslint/no-explicit-any */
import { useContext } from "react";
import { ModalContext } from "../ModalContext";
import { ModalType } from "../constants";

export type ModalAction = { type: ModalType; [key: string]: any } | null;

export const useModal = () => {
  const modalContext = useContext(ModalContext);

  if (!modalContext) {
    throw new Error("useModal must be used within ModalProvider");
  }

  return modalContext;
};

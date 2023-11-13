/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useContext, useEffect } from "react";
import { ModalContext } from "../ModalContext";
import { ModalType } from "../constants";

export type ModalAction = { type: ModalType; [key: string]: any } | null;

export type UseModal = {
  onModalAction?: (params: { action: ModalAction }) => void;
};

export const useModal = (params?: UseModal) => {
  const modalContext = useContext(ModalContext);

  if (!modalContext) {
    throw new Error("useModal must be used within ModalProvider");
  }

  const onModalAction = useCallback(
    ({ action }: { action: ModalAction }) =>
      params?.onModalAction?.({ action }),
    [params]
  );

  useEffect(() => {
    if (onModalAction) {
      onModalAction({ action: modalContext.modalAction });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalContext.modalAction]);

  return modalContext;
};

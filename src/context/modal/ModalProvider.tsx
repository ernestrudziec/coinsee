/* eslint-disable @typescript-eslint/no-explicit-any */
 
import { useEffect, useState } from "react";
import {
  CurrentModal,
  HandleOpenModalParams,
  ModalContext,
} from "./ModalContext";

interface ModalProviderProps {
  children: React.ReactNode;
  onModalAction?: (params: { action: any }) => void;
}

export const ModalProvider = ({
  children,
  onModalAction,
}: ModalProviderProps) => {
  const [currentModal, setCurrentModal] = useState<CurrentModal>(null);
  const [modalAction, setModalAction] = useState<any>(null);

  const handleOpenModal = (params: HandleOpenModalParams) => {
    setCurrentModal({ type: params.type, data: params?.data });
  };

  const handleCloseModal = () => {
    setCurrentModal(null);
    setModalAction(null);
  };

  const handleModalAction = (params: any) => {
    setModalAction(params);
  };

  useEffect(() => {
    if (modalAction && onModalAction) {
      onModalAction({ action: modalAction });
    }
  }, [modalAction, onModalAction]);

  const value = {
    handleOpenModal,
    handleCloseModal,
    handleModalAction,
    modalAction,
    currentModal,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

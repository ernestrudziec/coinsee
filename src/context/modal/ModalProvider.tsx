/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import {
  CurrentModal,
  HandleOpenModalParams,
  ModalContext,
} from "./ModalContext";

interface ModalProviderProps {
  children: React.ReactNode;
  onModalAction?: (params: { action: any }) => void;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [currentModal, setCurrentModal] = useState<CurrentModal>(null);

  const handleOpenModal = (params: HandleOpenModalParams) => {
    setCurrentModal({ type: params.type, data: params?.data });
  };

  const handleCloseModal = () => {
    setCurrentModal(null);
  };

  const value = {
    handleOpenModal,
    handleCloseModal,
    currentModal,
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
};

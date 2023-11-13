 
 
import { createContext } from "react";
import { ModalType } from "./constants";
import { ModalAction } from "./hooks/useModal";

export type HandleOpenModalParams = {
  type: ModalType;
  data?: unknown;
};

export type CurrentModal = {
  type: ModalType;
  data: unknown;
} | null;

export type ModalContextType = {
  handleOpenModal: (params: HandleOpenModalParams) => void;
  handleCloseModal: () => void;
  handleModalAction: (params: unknown) => void;
  modalAction: ModalAction;
  currentModal: CurrentModal;
};

export const ModalContext = createContext<ModalContextType>({
  handleOpenModal: () => {},
  handleCloseModal: () => {},
  handleModalAction: () => {},
  modalAction: null,
  currentModal: null,
});

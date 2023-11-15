import { createContext } from "react";
import { ModalType } from "./constants";

export type HandleOpenModalParams = {
  type: ModalType;
  data?: unknown;
};

export type CurrentModal = {
  type: ModalType;
  data?: unknown;
} | null;

export type ModalContextType = {
  handleOpenModal: (params: HandleOpenModalParams) => void;
  handleCloseModal: () => void;
  currentModal: CurrentModal;
};

export const ModalContext = createContext<ModalContextType>({
  handleOpenModal: () => {},
  handleCloseModal: () => {},
  currentModal: null,
});

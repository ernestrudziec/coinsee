import { Router } from "../../router/Router";
import { ModalSwitch } from "../../common/components/common/modals/ModalSwitch";
import { Providers } from "../Providers";

export const Root = () => {
  return (
    <Providers>
      <Router />
      <ModalSwitch />
    </Providers>
  );
};

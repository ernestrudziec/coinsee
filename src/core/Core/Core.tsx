import { ApolloProvider } from "@apollo/client";

import { apolloClient } from "../../graphql/apollo";
import { AuthProvider } from "../../context/auth/AuthProvider";
import { Router } from "../../router/Router";
import { ModalProvider } from "../../context/modal/ModalProvider";
import { ModalSwitch } from "../../components/common/modals/ModalSwitch";

export const Core = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <ModalProvider>
          <Router />
          <ModalSwitch />
        </ModalProvider>
      </AuthProvider>
    </ApolloProvider>
  );
};

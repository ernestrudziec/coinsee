import { ApolloProvider } from "@apollo/client";

import { apolloClient } from "../../graphql/apollo";
import { AuthProvider } from "../../context/auth/AuthProvider";
import { Router } from "../../router/Router";

export const Core = () => {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </ApolloProvider>
  );
};

import { ApolloProvider } from "@apollo/client";

import { AuthProvider } from "../../context/auth/AuthProvider";
import { ModalProvider } from "../../context/modal/ModalProvider";
import { PortfolioProvider } from "../../context/portfolio/PortfolioProvider";
import { apolloClient } from "../../database/graphql/apollo";

import { combineProviders } from "./utils";

export const Providers = combineProviders([
  [ApolloProvider, { client: apolloClient }],
  [AuthProvider],
  [PortfolioProvider],
  [ModalProvider],
]);

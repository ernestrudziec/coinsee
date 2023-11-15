/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { ComponentType, ComponentProps } from "react";

type Providers = [ComponentType<any> | ReactNode, ComponentProps<any>?][];

export const combineProviders = (
  providers: Providers
): FC<{ children: ReactNode | Element[] }> =>
  providers.reduce(
    (AccumulatedProviders, [Provider, props = {}]) =>
      ({ children }) =>
        (
          <AccumulatedProviders>
            <Provider {...props}>
              <>{children}</>
            </Provider>
          </AccumulatedProviders>
        ),
    ({ children }) => <>{children}</>
  );

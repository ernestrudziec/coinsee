import { Routes, Route, Outlet } from "react-router";

import { Layout } from "../../components/Layout";
import { ErrorPage } from "../../pages/public/misc/ErrorPage";
import { PrivateRoute } from "../components/PrivateRoute";
import { RouterPrivacy } from "../routes";
import { router } from "..";
import { PublicRoute } from "../components/PublicRoute";
import { useAuth } from "../../context/auth/hooks/useAuth";
import { LogInPage } from "../../pages/public/auth-pages/LogInPage";

export const Router = () => {
  return (
    <Routes>
      <Route>
        <Route
          element={
            <Layout>
              <Outlet />
            </Layout>
          }
        >
          {router.map(({ path, element: Component, privacy }) =>
            privacy === RouterPrivacy.PRIVATE ? (
              <Route
                key={path}
                path={path}
                element={
                  <PrivateRoute>
                    <Component />
                  </PrivateRoute>
                }
              />
            ) : null
          )}
        </Route>

        {router.map(({ path, element: Component, privacy, allowRedirect }) =>
          privacy === RouterPrivacy.PUBLIC ? (
            <Route
              key={path}
              path={path}
              element={
                <PublicRoute allowRedirect={allowRedirect}>
                  <Component />
                </PublicRoute>
              }
            />
          ) : null
        )}

        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

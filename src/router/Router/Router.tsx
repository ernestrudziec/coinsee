import { Routes, Route, Outlet } from "react-router";

import { Layout } from "../../components/Layout";
import { ErrorPage } from "../../pages/public/misc/ErrorPage";
import { PrivateRoute } from "../components/PrivateRoute";
import { RouterPrivacy } from "../routes";
import { useAuth } from "../../context/auth/useAuth";
import { router } from "..";
import { useEffect } from "react";

export const Router = () => {
  const { currentUser } = useAuth();

  useEffect(() => {
    console.log({ currentUser });
  }, [currentUser]);

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

        {router.map(({ path, element: Component, privacy }) =>
          privacy === RouterPrivacy.PUBLIC ? (
            <Route key={path} path={path} element={<Component />} />
          ) : null
        )}

        <Route path="*" element={<ErrorPage />} />
      </Route>
    </Routes>
  );
};

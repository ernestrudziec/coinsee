import { useLocation } from "react-router";
import { router } from "..";

export const useCurrentRoute = () => {
  const location = useLocation();

  const currentRoute = router.find((route) => {
    return route.path === location.pathname;
  });

  return currentRoute;
};

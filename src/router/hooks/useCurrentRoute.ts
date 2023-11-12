import { useLocation } from "react-router";
import { router } from "..";

export const useCurrentRoute = () => {
  const location = useLocation();

  const currentRoute = router.find((route) => {
    return location.pathname.includes(route.path);
  });

  return currentRoute;
};

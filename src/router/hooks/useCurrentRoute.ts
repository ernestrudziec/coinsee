import { useLocation } from "react-router";
import { router } from "..";

export const useCurrentRoute = () => {
  const location = useLocation();

  const currentRoute = router
    .filter((route) => {
      const sanitizedPath = route.path.replace(/\/:[a-zA-Z]+/g, "");

      return location.pathname.includes(sanitizedPath);
    })
    .sort((a, b) => b.path.length - a.path.length)?.[0];

  return currentRoute;
};

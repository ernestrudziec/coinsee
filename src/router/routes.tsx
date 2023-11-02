import { DashboardPage } from "../pages/private/DashboardPage";
import { LogInPage } from "../pages/public/auth-pages/LogInPage";
import { LogOutPage } from "../pages/public/auth-pages/LogOutPage";
import { SignUpPage } from "../pages/public/auth-pages/SignUpPage";
import { LandingPage } from "../pages/public/guest/LandingPage/LandingPage";
import { ErrorPage } from "../pages/public/misc/ErrorPage";

export enum RouterPrivacy {
  PRIVATE = "private",
  PUBLIC = "public",
}

export enum PrivateRoutePath {
  DASHBOARD = "/dashboard",
  PORTFOLIO = "/portfolio",
  SETTINGS = "/settings",
}

export enum PublicRoutePath {
  LANDING = "/",
  LOGIN = "/login",
  LOGOUT = "/logout",
  SIGN_UP = "/sign-up",
  ERROR = "/error",
}

export type RoutePath = PrivateRoutePath & PublicRoutePath;

// {
//   privacy: RouterPrivacy.PRIVATE,
//   path: PrivateRoutePath.PORTFOLIO
//   element: PortfolioPage
// }

export const privateRoutes = [
  {
    privacy: RouterPrivacy.PRIVATE,
    path: PrivateRoutePath.DASHBOARD,
    element: DashboardPage,
  },
];

export const publicRoutes = [
  {
    privacy: RouterPrivacy.PUBLIC,
    path: PublicRoutePath.LOGIN,
    element: LogInPage,
  },
  {
    privacy: RouterPrivacy.PUBLIC,
    path: PublicRoutePath.LOGOUT,
    element: LogOutPage,
  },
  {
    privacy: RouterPrivacy.PUBLIC,
    path: PublicRoutePath.SIGN_UP,
    element: SignUpPage,
  },
  {
    privacy: RouterPrivacy.PUBLIC,
    path: PublicRoutePath.LANDING,
    element: LandingPage,
  },
  {
    privacy: RouterPrivacy.PUBLIC,
    path: PublicRoutePath.ERROR,
    element: ErrorPage,
  },
];

export const router = [...privateRoutes, ...publicRoutes] as const;

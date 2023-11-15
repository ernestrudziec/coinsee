import { DashboardPage } from "../pages/private/DashboardPage";
import { MyProfilePage } from "../pages/private/MyProfilePage/DashboardPage";
import { PortfolioPage } from "../pages/private/PortfolioPage/PortfolioPage";
import { WalletPage } from "../pages/private/WalletPage/WalletPage";
import { LogInPage } from "../pages/public/auth-pages/LogInPage";
import { LogOutPage } from "../pages/public/auth-pages/LogOutPage";
import { SignUpPage } from "../pages/public/auth-pages/SignUpPage";
import { LandingPage } from "../pages/public/guest/LandingPage/LandingPage";
import { ErrorPage } from "../pages/public/misc/ErrorPage";

import {
  RadarChartOutlined,
  DashboardOutlined,
  UserOutlined,
  WalletFilled,
} from "@ant-design/icons";

export enum RouterPrivacy {
  PRIVATE = "private",
  PUBLIC = "public",
}

export enum PrivateRoutePath {
  DASHBOARD = "/dashboard",
  PORTFOLIO = "/portfolio",
  WALLET = "/portfolio/wallet",
  MY_PROFILE = "/my-profile",
}

export enum PublicRoutePath {
  LANDING = "/",
  LOGIN = "/login",
  LOGOUT = "/logout",
  SIGN_UP = "/sign-up",
  ERROR = "/error",
}

export type RoutePath = PrivateRoutePath & PublicRoutePath;

export const privateRoutes = [
  {
    privacy: RouterPrivacy.PRIVATE,
    path: PrivateRoutePath.DASHBOARD,
    element: DashboardPage,
    title: (
      <>
        <DashboardOutlined style={{ marginRight: 10 }} />
        Dashboard
      </>
    ),
    key: "dashboard",
    allowRedirect: true,
  },
  {
    privacy: RouterPrivacy.PRIVATE,
    path: PrivateRoutePath.MY_PROFILE,
    element: MyProfilePage,
    title: (
      <>
        <UserOutlined style={{ marginRight: 10 }} />
        My profile
      </>
    ),
    key: "my-profile",
    allowRedirect: true,
  },
  {
    privacy: RouterPrivacy.PRIVATE,
    path: PrivateRoutePath.PORTFOLIO,
    element: PortfolioPage,
    title: (
      <>
        <RadarChartOutlined style={{ marginRight: 10 }} />
        Portfolio
      </>
    ),
    key: "portfolio",
    allowRedirect: true,
  },
  {
    privacy: RouterPrivacy.PRIVATE,
    path: PrivateRoutePath.WALLET + "/:walletId",
    element: WalletPage,
    title: (
      <>
        <WalletFilled style={{ marginRight: 10 }} />
        Wallet details
      </>
    ),
    key: "wallet",
    allowRedirect: true,
  },
];

export const publicRoutes = [
  {
    privacy: RouterPrivacy.PUBLIC,
    path: PublicRoutePath.LOGIN,
    element: LogInPage,
    title: "Log in",
    key: "login",
    allowRedirect: true,
  },
  {
    privacy: RouterPrivacy.PUBLIC,
    path: PublicRoutePath.LOGOUT,
    element: LogOutPage,
    title: "Log out",
    key: "logout",
    allowRedirect: false,
  },
  {
    privacy: RouterPrivacy.PUBLIC,
    path: PublicRoutePath.SIGN_UP,
    element: SignUpPage,
    title: "Sign up",
    key: "sign-up",
    allowRedirect: true,
  },
  {
    privacy: RouterPrivacy.PUBLIC,
    path: PublicRoutePath.LANDING,
    element: LandingPage,
    title: "Landing page",
    key: "landing",
    allowRedirect: true,
  },
  {
    privacy: RouterPrivacy.PUBLIC,
    path: PublicRoutePath.ERROR,
    element: ErrorPage,
    title: "Error page",
    key: "error",
    allowRedirect: true,
  },
];

export const router = [...privateRoutes, ...publicRoutes] as const;

import React from "react";

import {
  RadarChartOutlined,
  DashboardOutlined,
  SettingOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { PrivateRoutePath, PublicRoutePath } from "../../../router/routes";

export const menuConfig = [
  {
    key: "dashboard",
    icon: React.createElement(() => (
      <Link to={PrivateRoutePath.DASHBOARD}>
        <DashboardOutlined style={{ marginRight: 10 }} />
      </Link>
    )),
    label: "Dashboard",
  },
  {
    key: "portfolio",
    icon: React.createElement(() => (
      <Link to={PrivateRoutePath.PORTFOLIO}>
        <RadarChartOutlined style={{ marginRight: 10 }} />
      </Link>
    )),
    label: "Portfolio",
  },

  {
    key: "my-profile",
    icon: React.createElement(() => (
      <Link to={PrivateRoutePath.MY_PROFILE}>
        <UserOutlined style={{ marginRight: 10 }} />
      </Link>
    )),
    label: "My profile",
  },
];

export const footerMenuConfig = [
  {
    key: "logout",
    icon: React.createElement(() => (
      <Link to={PublicRoutePath.LOGOUT}>
        <LogoutOutlined style={{ marginRight: 10 }} />
      </Link>
    )),
    label: "Log out",
  },
];

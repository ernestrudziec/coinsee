import React from "react";
import { Flex, Layout as AntDLayout, Menu, Typography, theme } from "antd";
import { Link } from "react-router-dom";

import {
  RadarChartOutlined,
  DashboardOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { PublicRoutePath } from "../../router/routes";

const { Header, Content, Footer, Sider } = AntDLayout;

export type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menu = [
    {
      key: "1",
      icon: React.createElement(DashboardOutlined),
      label: "Dashboard",
    },
    {
      key: "2",
      icon: React.createElement(RadarChartOutlined),
      label: "Portfolio",
    },
    {
      key: "3",
      icon: React.createElement(SettingOutlined),
      label: "Settings",
    },
  ];

  return (
    <AntDLayout>
      <Sider breakpoint="lg" collapsedWidth="0">
        <Typography
          style={{
            color: "white",
            margin: "24px 0px",
            padding: "20px 24px",
            fontSize: "36px",
            fontWeight: 200,
            letterSpacing: "2px",
          }}
        >
          coin<span style={{ fontWeight: 600 }}>see.</span>
        </Typography>
        <Menu
          theme="dark"
          mode="inline"
          style={{ padding: "15px" }}
          defaultSelectedKeys={["1"]}
          items={menu}
        />
      </Sider>
      <AntDLayout>
        <Header
          style={{
            padding: "24px 48px",
            background: colorBgContainer,
            height: "auto",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row-reverse",
            alignItems: "center",
          }}
        >
          <Flex>
            <Link to={PublicRoutePath.LOGOUT} style={{ marginLeft: "24px" }}>
              Log out
            </Link>
          </Flex>
          <Typography style={{ fontSize: "24px", fontWeight: 600 }}>
            Cryptocurrency dashboard that allows you to track your income!
          </Typography>
        </Header>
        <Content style={{ margin: "24px 16px 0" }}>
          <div
            style={{
              padding: 24,
              minHeight: "calc(100vh - 120px - 24px)",
              background: colorBgContainer,
            }}
          >
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center", maxHeight: 60 }}>
          Coinsee ©2023 Created by Ernest Rudziec
        </Footer>
      </AntDLayout>
    </AntDLayout>
  );
};

import React, { useEffect, useState } from "react";
import {
  Flex,
  Layout as AntDLayout,
  Menu,
  theme,
  Grid,
  Button,
  Typography,
  Tooltip,
  Spin,
} from "antd";

import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Logo } from "../common/Logo";

import { footerMenuConfig, menuConfig } from "./config";
import { useCurrentRoute } from "../../router/hooks/useCurrentRoute";
import { PrivateRoutePath } from "../../router/routes";
import { useAuth } from "../../context/auth/useAuth";
import { getFirestoreData } from "../../firebase/utils";

const { Header, Content, Footer, Sider } = AntDLayout;

export type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  const currentRoute = useCurrentRoute() || null;
  const currentRouteKey = currentRoute?.key || "";

  const currentUser = useAuth();

  const userData = getFirestoreData({
    collectionName: "users",
    document: currentUser?.currentUser?.uid,
  });

  useEffect(() => {
    console.log({ currentUser, userData });
  }, [currentUser, userData]);

  useEffect(() => {
    screens.lg && setCollapsed(false);
    !screens.lg && setCollapsed(true);
  }, [screens, currentRoute]);

  const [collapsed, setCollapsed] = useState(screens.lg ? false : true);

  return (
    <AntDLayout
      style={{ marginLeft: screens.lg && !collapsed ? 180 : 0, padding: 0 }}
    >
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="lg"
        collapsedWidth="0"
        width={screens.lg ? "180px" : "100%"}
        style={{
          overflow: "visible",
          height: "100vh",
          position: "fixed",
          opacity: 1,
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 99,
          padding: "5px 0px",
        }}
      >
        <div style={{ maxWidth: "90%", margin: "10px auto" }}>
          <Logo color="white" width={100} style={{ marginBottom: 60 }} />

          <Button
            type="text"
            icon={
              !collapsed ? (
                <MenuUnfoldOutlined style={{ color: "white" }} />
              ) : (
                <MenuFoldOutlined style={{ color: "white" }} />
              )
            }
            onClick={() => setCollapsed(!collapsed)}
            style={{
              backgroundColor: "#001529",
              color: "black",
              fontSize: "16px",
              width: 64,
              height: 64,
              position: "absolute",
              top: 16,
              zIndex: 999,
              right: !screens.lg && !collapsed ? 0 : -50,
              padding: 10,
              overflow: "auto",
            }}
          />

          <Flex
            style={{ height: "calc(100% - 200px)" }}
            justify="space-between"
            align="center"
            vertical
          >
            <Menu
              selectedKeys={[currentRouteKey]}
              theme="dark"
              mode="inline"
              style={{
                padding: "15ppx",
                width: "100%",
              }}
              items={menuConfig}
            />

            <Menu
              theme="dark"
              mode="inline"
              style={{
                marginTop: "24px",
                padding: "15 0px",
                minWidth: "90%",
                justifySelf: "flex-end",
                alignSelf: "flex-end",
                width: "100%",
              }}
              items={footerMenuConfig}
            />
          </Flex>
        </div>
      </Sider>
      <AntDLayout>
        <Header
          style={{
            backgroundColor: "white",
            minHeight: 100,
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: "0 5%",
            paddingLeft: "60px",
          }}
        >
          <Flex
            justify="space-between"
            align="center"
            style={{ width: "100%", margin: 0, padding: 0 }}
          >
            <Typography
              style={{ fontSize: "24px", fontWeight: 800, marginLeft: "20px" }}
            >
              {currentRoute?.title}
            </Typography>
            {currentUser?.currentUser?.email ? (
              <Tooltip title="My profile">
                <Button
                  href={PrivateRoutePath.MY_PROFILE}
                  type="primary"
                  style={{ background: "#001529" }}
                  shape={!screens.lg ? "circle" : "default"}
                >
                  <Flex
                    align="center"
                    justify="center"
                    style={{ width: "100%", height: "100%" }}
                  >
                    {screens.lg && (
                      <Typography style={{ color: "white", marginRight: 8 }}>
                        {currentUser?.currentUser?.email}
                      </Typography>
                    )}
                    <UserOutlined />
                  </Flex>
                </Button>
              </Tooltip>
            ) : (
              <Spin />
            )}
          </Flex>
        </Header>
        <Content style={{ margin: 0, padding: 0 }}>
          <div
            style={{
              padding: 0,
              background: colorBgContainer,
              minHeight: "100%",
              overflowX: "scroll",
            }}
          >
            {children}
          </div>
        </Content>

        <Footer
          style={{
            opacity: 0.5,
            margin: "0.4rem 0",
            textAlign: "center",
          }}
        >
          Coinsee ©2023 Created by Ernest Rudziec
        </Footer>
      </AntDLayout>
    </AntDLayout>
  );
};

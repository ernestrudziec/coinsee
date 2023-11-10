import { Flex, Spin } from "antd";

export const LoadingPage = () => {
  return (
    <Flex
      justify="center"
      align="center"
      vertical
      style={{
        width: "100%",
        height: "100%",
        position: "fixed",
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        background: "white",
        content: "",
        zIndex: 99999,
      }}
    >
      <Spin size="large" style={{ margin: 30 }} />
    </Flex>
  );
};

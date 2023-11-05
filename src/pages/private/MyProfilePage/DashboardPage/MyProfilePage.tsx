import { Flex, Typography } from "antd";

export const MyProfilePage = () => {
  return (
    <Flex style={{ padding: 20, minHeight: "calc(100vh - 178px)" }}>
      <Typography style={{ fontSize: 24, fontWeight: 700 }}>
        My profile
      </Typography>
    </Flex>
  );
};

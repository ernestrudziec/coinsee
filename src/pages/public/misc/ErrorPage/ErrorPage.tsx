import { Button, Flex, Result } from "antd";
import { useNavigate } from "react-router";

export const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <Flex
      justify="center"
      align="center"
      style={{ width: "100%", minHeight: "80vh" }}
    >
      <Result
        status="error"
        title="This page does not exist!"
        subTitle="Please navigate to dashboard if you are logged in or go back."
        extra={[
          <Button onClick={() => navigate(-2)} type="primary" key="console">
            Go back
          </Button>,
          <Button href="/" key="buy">
            Home
          </Button>,
        ]}
      />
    </Flex>
  );
};

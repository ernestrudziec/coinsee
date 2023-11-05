import { Button, Form, Input, Result } from "antd";
import backgroundVideo from "../../../../assets/background.mp4";

import "./SignUpPage.styles.scss";
import { useAuth } from "../../../../context/auth/useAuth";
import { useEffect } from "react";
import { RequestStatus } from "../../../../context/auth/constants";
import { PrivateRoutePath } from "../../../../router/routes";
import { Logo } from "../../../../components/common/Logo";

export const SignUpPage = () => {
  const {
    signUp: { execute, error, status },
  } = useAuth();

  const onFinish = async (values: { email: string; password: string }) => {
    await execute({
      email: values.email,
      password: values.password,
    });
  };

  const onFinishFailed = (errorInfo: unknown) => {
    console.log("Failed:", errorInfo);
  };

  type FieldType = {
    email?: string;
    password?: string;
    remember?: string;
  };

  return (
    <div className="signup-page">
      <header>
        <div className="background-video">
          <video className="videoTag" autoPlay loop muted>
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        </div>
        <Logo color="black" size="small" style={{ marginBottom: 60 }} />

        {status === RequestStatus.SUCCESS ? (
          <Result
            status="success"
            title="Successfully created account."
            subTitle="Please navigate to dashboard if you are logged in or go back."
            extra={[
              <Button type="dashed" href={PrivateRoutePath.DASHBOARD} key="buy">
                Navigate to dashboard
              </Button>,
            ]}
          />
        ) : (
          <>
            <h2>Register your account</h2>
            <h3> to unveal full potential of your portfolio.</h3>

            <div className="signup-form">
              <Form
                name="basic"
                style={{ maxWidth: 1200, width: 350 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="on"
                layout="vertical"
              >
                <Form.Item<FieldType>
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item<FieldType>
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item>
                  <Button
                    size="middle"
                    type="primary"
                    htmlType="submit"
                    loading={status === RequestStatus.PENDING}
                  >
                    Create account
                  </Button>
                </Form.Item>

                <Form.ErrorList errors={[error]} className="error-list" />
              </Form>
            </div>
          </>
        )}
      </header>
    </div>
  );
};

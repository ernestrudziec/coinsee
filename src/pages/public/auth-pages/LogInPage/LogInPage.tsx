/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useNavigate } from "react-router";

import backgroundVideo from "../../../../assets/background.mp4";
import { useAuth } from "../../../../context/auth/hooks/useAuth";
import { RequestStatus } from "../../../../context/auth/constants";
import { PrivateRoutePath } from "../../../../router/routes";

import "./LogInPage.styles.scss";
import { Logo } from "../../../../components/common/brand/Logo";

export const LogInPage = () => {
  const {
    logIn: { execute, error, status },
  } = useAuth();

  const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string }) => {
    await execute({
      email: values.email,
      password: values.password,
    });
  };

  type FieldType = {
    email?: string;
    password?: string;
    remember?: string;
  };

  useEffect(() => {
    status === RequestStatus.SUCCESS && navigate(PrivateRoutePath.DASHBOARD);
  }, [status, error, navigate]);

  return (
    <div className="login-page">
      <header>
        <div className="background-video">
          <video className="videoTag" autoPlay loop muted>
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        </div>
        <Logo color="black" size="small" style={{ marginBottom: 60 }} />
        <h2>Login</h2>
        <p>
          Stay up-to-date with the latest cryptocurrency prices, manage your
          portfolio, and make informed investment decisions.
        </p>

        <div className="login-form">
          <Form
            name="basic"
            style={{ maxWidth: 1200, width: 350 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="on"
            layout="vertical"
          >
            <Form.Item<FieldType>
              label="Email"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
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

            <Form.Item<FieldType> name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                style={{ width: "60%" }}
                size="middle"
                type="primary"
                htmlType="submit"
                loading={status === RequestStatus.PENDING}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </header>
    </div>
  );
};

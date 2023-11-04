/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { Button } from "antd";

import backgroundVideo from "../../../../assets/background.mp4";
import { useAuth } from "../../../../context/auth/useAuth";
import { PublicRoutePath } from "../../../../router/routes";

import "./LogOutPage.styles.scss";
import { Logo } from "../../../../components/common/Logo";

export const LogOutPage = () => {
  const {
    logOut: { execute, error, status },
  } = useAuth();

  useEffect(() => {
    console.log({ error, status });
    execute();
  }, [error, execute, status]);

  return (
    <div className="login-page">
      <header>
        <div className="background-video">
          <video className="videoTag" autoPlay loop muted>
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        </div>
        <Logo color="black" size="small" style={{ marginBottom: 60 }} />
        <h2>Log out</h2>
        <p>You've successfully log out!</p>

        <div className="login-form">
          <Button type="primary" href={PublicRoutePath.LANDING}>
            Go back to landing page
          </Button>
        </div>
      </header>
    </div>
  );
};

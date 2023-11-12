 
import { useEffect } from "react";
import { Button } from "antd";

import backgroundVideo from "../../../../assets/background.mp4";
import { useAuth } from "../../../../context/auth/hooks/useAuth";
import { PublicRoutePath } from "../../../../router/routes";

import "./LogOutPage.styles.scss";
import { Logo } from "../../../../components/common/brand/Logo";

export const LogOutPage = () => {
  const {
    logOut: { execute, error, status },
  } = useAuth();

  useEffect(() => {
    execute();
  }, [error, execute, status]);

  return (
    <div className="logout-page">
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

import { Button } from "antd";
import "./LandingPage.styles.scss";
import { PublicRoutePath } from "../../../../router/routes";
import backgroundVideo from "../../../../assets/background.mp4";
import { Logo } from "../../../../common/components/common/brand/Logo";

export const LandingPage = () => {
  return (
    <div className="landing">
      <header>
        <div className="background-video">
          <video className="videoTag" autoPlay loop muted>
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        </div>
        <Logo color="black" width={200} style={{ marginBottom: 30 }} />
        <h2>
          Track and <span style={{ color: "#1677ff" }}>Analyze </span>
          Your&nbsp;Cryptocurrency Portfolio
        </h2>
        <p>
          Stay up-to-date with the latest cryptocurrency prices, manage your
          portfolio, and make informed investment decisions.
        </p>
        <div>
          <Button type="primary" size="large" href={PublicRoutePath.SIGN_UP}>
            Get started
          </Button>
          <Button
            type="dashed"
            size="large"
            style={{ marginLeft: "12px" }}
            href={PublicRoutePath.LOGIN}
          >
            Login
          </Button>
        </div>
      </header>
    </div>
  );
};

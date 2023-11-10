import LogoWhite from "../../../../assets/coinsee_logo_white.png";
import LogoDark from "../../../../assets/coinsee_logo_dark.png";

import "./Logo.styles.scss";

export type LogoProps = {
  color?: "white" | "black";
  size?: "small" | "large";
  width?: number;
  style?: React.CSSProperties;
};

export const Logo = (props: LogoProps) => {
  const { color, size, width: customWidth, style } = props;
  const ALT_TEXT = "Coinsee Logo";

  const width = customWidth ? customWidth : size === "small" ? 150 : 200;

  return (
    <div className="logo" style={style}>
      {color === "black" ? (
        <img style={{ width }} src={LogoDark} alt={ALT_TEXT} />
      ) : (
        <img style={{ width }} src={LogoWhite} alt={ALT_TEXT} />
      )}
    </div>
  );
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tooltip } from "antd";
import coinImage from "../../../../../assets/coin64.ico";

export type IconCellProps = {
  symbol: string;
  name: string | number;
};

export const IconCell = ({ symbol, name }: IconCellProps) => {
  return (
    <Tooltip key={symbol} title={name}>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <img
          style={{ height: "30px", marginRight: "10px" }}
          src={`https://assets.coincap.io/assets/icons/${symbol?.toLowerCase()}@2x.png`} // icon url
          onError={(e: any) => {
            e.target.onError = null;
            e.target.src = coinImage; // fallback if there's no icon in coincap database
          }}
        />
        <span>{symbol}</span>
      </div>
    </Tooltip>
  );
};

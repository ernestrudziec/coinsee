import { Tag } from "antd";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";

export type ChangeCellProps = {
  changePercent24Hr: number | string;
  suffix?: string;
  prefix?: string;
};

export const ChangeCell = ({
  changePercent24Hr,
  suffix,
  prefix,
}: ChangeCellProps) => {
  const rounded = Math.round(Number(changePercent24Hr) * 100) / 100;

  return (
    <Tag
      style={{ padding: "2px 10px", minWidth: 90, opacity: 1 }}
      color={rounded > 0 ? "success" : "error"}
    >
      {rounded > 0 ? (
        <CaretUpOutlined
          style={{ marginRight: 5, position: "relative", top: 0 }}
        />
      ) : (
        <CaretDownOutlined
          style={{ marginRight: 5, position: "relative", bottom: -1 }}
        />
      )}
      {prefix || ""}
      {rounded}
      {suffix === "" ? "" : "%"}
    </Tag>
  );
};

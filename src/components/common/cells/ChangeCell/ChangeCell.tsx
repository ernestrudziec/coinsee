 
import { Tag } from "antd";
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";

export type ChangeCellProps = {
  changePercent24Hr: number | string;
};

export const ChangeCell = ({ changePercent24Hr }: ChangeCellProps) => {
  const rounded = Math.round(Number(changePercent24Hr) * 100) / 100;

  return (
    <Tag color={rounded > 0 ? "green" : "red"}>
      {rounded > 0 ? (
        <CaretUpOutlined style={{ marginRight: 5 }} />
      ) : (
        <CaretDownOutlined style={{ marginRight: 5 }} />
      )}
      {rounded}%
    </Tag>
  );
};

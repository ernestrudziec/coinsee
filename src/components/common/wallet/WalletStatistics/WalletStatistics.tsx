import { Flex, Statistic } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

import { WalletTotal } from "../../../../types/entities";

export type WalletStatisticsProps = {
  data: WalletTotal;
  extended?: boolean;
};

export const WalletStatistics = (props: WalletStatisticsProps) => {
  const { data: total, extended: isExtended } = props;

  const isProfitable = total.profit.amountUsd > 0;

  return (
    <Flex vertical>
      <Flex>
        <Statistic
          title="Total amount (USD)"
          value={total.amountUsd.now}
          precision={2}
          prefix="$"
          valueStyle={{ fontSize: 22 }}
          style={{ marginRight: 20 }}
        />
        <Statistic
          title={isProfitable ? "Profit" : "Loss"}
          value={total.profit.percentage}
          precision={2}
          valueStyle={{
            color: isProfitable ? "#3f8600" : "#cf1322",
            fontSize: 22,
          }}
          prefix={isProfitable ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          suffix="%"
        />
      </Flex>
      {isExtended && (
        <Flex style={{ marginTop: 20 }}>
          <Statistic
            title={"Total invested (USD)"}
            value={total.amountUsd.then}
            precision={0}
            valueStyle={{
              fontSize: 22,
            }}
            prefix="$"
            style={{ marginRight: 20 }}
          />
          <Statistic
            title={isProfitable ? "Profit (USD)" : "Loss (USD)"}
            value={total.profit.amountUsd}
            precision={2}
            valueStyle={{
              color: isProfitable ? "#3f8600" : "#cf1322",
              fontSize: 22,
            }}
            prefix={"$"}
            style={{ marginRight: 20 }}
          />
          <Statistic
            title={"Transactions"}
            value={total.transactions}
            precision={0}
            valueStyle={{
              fontSize: 22,
            }}
            style={{ marginRight: 20 }}
          />
        </Flex>
      )}
    </Flex>
  );
};

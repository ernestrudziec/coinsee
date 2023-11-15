import { Flex, Statistic } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

import { WalletTotal } from "../../../../types/entities";
import { Colors } from "../../../../constants/colors";

export type WalletStatisticsProps = {
  data: WalletTotal;
  extended?: boolean;
};

export const WalletStatistics = (props: WalletStatisticsProps) => {
  const { data: total, extended: isExtended } = props;

  const isProfitable = total.profit.amountUsd > 0;

  return (
    <Flex vertical>
      {isExtended ? (
        <Flex style={{ marginBottom: 16 }}>
          <Statistic
            title={"Transactions"}
            value={total.transactions}
            precision={0}
            valueStyle={{
              fontSize: 22,
            }}
            style={{ marginRight: 20 }}
          />
          <Statistic
            title={"Assets"}
            value={total.assets}
            precision={0}
            valueStyle={{
              fontSize: 22,
            }}
            style={{ marginRight: 20 }}
          />
        </Flex>
      ) : null}
      <Flex>
        <Statistic
          title="Total amount (USD)"
          value={total.amountUsd.now}
          precision={2}
          prefix="$"
          valueStyle={{ fontSize: 22 }}
          style={{ marginRight: 20 }}
        />
        {total.profit.percentage !== 0 ? (
          <Statistic
            title={isProfitable ? "Profit" : "Loss"}
            value={total.profit.percentage}
            precision={2}
            valueStyle={{
              color: isProfitable ? Colors.GREEN : Colors.GREEN,
              fontSize: 22,
            }}
            prefix={isProfitable ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="%"
          />
        ) : null}
      </Flex>
      {isExtended && (
        <Flex style={{ marginTop: 20 }}>
          <Statistic
            title={"Total invested (USD)"}
            value={total.amountUsd.then}
            precision={2}
            valueStyle={{
              fontSize: 22,
            }}
            prefix="$"
            style={{ marginRight: 20 }}
          />
          {total.profit.percentage !== 0 ? (
            <Statistic
              title={isProfitable ? "Profit (USD)" : "Loss (USD)"}
              value={total.profit.amountUsd}
              precision={2}
              valueStyle={{
                color: isProfitable ? Colors.GREEN : Colors.RED,
                fontSize: 22,
              }}
              prefix={"$"}
              style={{ marginRight: 20 }}
            />
          ) : null}
        </Flex>
      )}
    </Flex>
  );
};

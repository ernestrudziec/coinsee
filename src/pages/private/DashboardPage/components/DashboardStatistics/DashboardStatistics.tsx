/* eslint-disable @typescript-eslint/ban-types */
import { Flex, Spin, Statistic } from "antd";
import { statisticsConfig } from "./config";

export type DashboardStatisticsProps = {
  marketTotal: Object | null;
};

export const DashboardStatistics = (props: DashboardStatisticsProps) => {
  const { marketTotal } = props;

  return (
    <Flex
      style={{
        minHeight: 120,
        padding: 20,
      }}
      wrap="wrap"
      justify="flex-start"
      align="center"
    >
      {marketTotal ? (
        statisticsConfig.map((config, index) => (
          <Statistic
            key={index}
            title={config.title}
            value={
              marketTotal?.[
                config.key as keyof typeof marketTotal
              ] as unknown as number
            }
            prefix={config.prefix}
            precision={config.precision}
            style={{
              marginRight: 40,
              marginBottom: 20,
            }}
            valueStyle={{ fontSize: 16, fontWeight: 600 }}
          />
        ))
      ) : (
        <Spin size="small" />
      )}
    </Flex>
  );
};

export default DashboardStatistics;

/* eslint-disable @typescript-eslint/ban-types */
import { ExtraWalletData } from "../../../../../../common/types/entities";
import { MouseEventHandler } from "react";
import { Card, Empty, Flex, Tooltip, Typography } from "antd";
import { EyeOutlined, DeleteOutlined, WalletFilled } from "@ant-design/icons";
import { WalletStatistics } from "../../../../../../common/components/common/wallet/WalletStatistics";

type WalletTileProps = {
  wallet: ExtraWalletData;
  onWalletDeleteClick?: Function;
  onWalletViewClick?: Function;
};

export const WalletTile = (props: WalletTileProps) => {
  const { onWalletDeleteClick, onWalletViewClick, wallet } = props;

  const isWalletEmpty = wallet.total.amountUsd.now === 0;

  const actions = [
    <Tooltip title="Delete wallet">
      <DeleteOutlined
        key="delete"
        onClick={onWalletDeleteClick as MouseEventHandler<HTMLSpanElement>}
      />
    </Tooltip>,
  ];

  if (!isWalletEmpty)
    actions.unshift(
      <Tooltip title="View wallet details">
        <EyeOutlined
          key="view"
          onClick={
            onWalletViewClick as MouseEventHandler<HTMLSpanElement> | undefined
          }
        />
      </Tooltip>
    );

  return (
    <Card
      style={{
        width: 350,
        boxShadow: "8px 8px 80px -37px rgba(66, 68, 90, 0.6)",
        borderRadius: 10,
        marginRight: 20,
        marginBottom: 20,
      }}
      actions={actions}
    >
      <Flex
        style={{
          borderBottom: "1px solid rgba(0,0,0,0.1)",
          paddingBottom: 10,
        }}
      >
        <WalletFilled />
        <Typography style={{ marginLeft: 10 }}>{wallet.name}</Typography>
      </Flex>

      {!isWalletEmpty ? (
        <Flex justify="flex-start" align="flex-start" style={{ marginTop: 10 }}>
          <WalletStatistics data={wallet.total} />
        </Flex>
      ) : (
        <Empty
          style={{
            height: 50,
            paddingTop: 50,
            paddingBottom: 20,
            marginBlock: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
          imageStyle={{ height: 20 }}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={<span>Wallet is empty</span>}
        />
      )}
    </Card>
  );
};

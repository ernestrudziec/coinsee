/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  DatePicker,
  Flex,
  Form,
  InputNumber,
  Modal,
  Row,
  Select,
  Typography,
} from "antd";
import { useState } from "react";
import { IconCell } from "../../cells/IconCell";
import dayjs from "dayjs";
import { getUsd } from "../../../../utils/formatters";
import { useAuth } from "../../../../context/auth/hooks/useAuth";
import { ChangeCell } from "../../cells/ChangeCell";
import { useNavigate } from "react-router";
import { PrivateRoutePath } from "../../../../router/routes";
import { usePortfolio } from "../../../../hooks/api/usePortfolio/usePortfolio";
import { WalletOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { transactionApi } from "../../../../firebase/api/transaction/transactionApi";
import { CoinData, TransactionType } from "../../../../types/entities";

const { Option } = Select;

export type AddTransactionModalProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  data: CoinData | null;
};

export const AddTransactionModal = ({
  isOpen,
  setIsOpen,
  data: coin,
}: AddTransactionModalProps) => {
  const navigate = useNavigate();

  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(dayjs());
  const [transactionType, setTransactionType] = useState<TransactionType>(
    TransactionType.BUY
  );
  const [walletId, setWalletId] = useState<string | null>(null);

  const { currentUser } = useAuth();

  const { wallets, hasAnyWallet } = usePortfolio();

  const handleOk = async () => {
    if (coin !== null && walletId !== null) {
      await transactionApi.create({
        type: transactionType,
        uid: currentUser.uid,
        coin,
        walletId,
        amount,
        transactionDate: new Date(date.toISOString()),
      });
      setIsOpen(false);
      navigate(PrivateRoutePath.PORTFOLIO);
    }
  };

  return (
    <>
      <Modal
        title={"Add transaction"}
        centered
        open={isOpen}
        onOk={handleOk}
        onCancel={() => setIsOpen(false)}
        okText="Add transaction"
        okButtonProps={{
          disabled: !(amount && date && walletId && transactionType),
        }}
      >
        {!wallets?.length ? (
          <>
            <Typography style={{ marginBottom: 16 }}>
              No wallet connected with your account.
            </Typography>
            <Link to={PrivateRoutePath.PORTFOLIO}>
              <Button type="primary">
                <WalletOutlined />
                Create new wallet
              </Button>
            </Link>
          </>
        ) : null}
        {wallets?.length && coin ? (
          <>
            <Flex
              justify="space-between"
              align="center"
              wrap="wrap"
              style={{
                background: "#f2f2f2",
                padding: "12px 24px",
                margin: "24px 0px",
                borderRadius: 5,
                opacity: hasAnyWallet ? 1 : 0.5,
                pointerEvents: hasAnyWallet ? "all" : "none",
              }}
            >
              <div style={{ fontWeight: 700, marginRight: 12, padding: 10 }}>
                {coin?.name}
              </div>
              <IconCell symbol={coin.symbol} name={coin.name} />
              <div style={{ padding: 10 }}>{getUsd(Number(coin.priceUsd))}</div>
              <div style={{ padding: 10 }}>
                <ChangeCell changePercent24Hr={coin.changePercent24Hr} />
              </div>
            </Flex>
            <Form autoComplete="on" layout="vertical" style={{ width: "100%" }}>
              <Row justify={"space-between"} wrap>
                <Form.Item label="Amount" style={{ width: "48%" }}>
                  <InputNumber
                    style={{ width: "100%" }}
                    placeholder="Enter amount"
                    min={0}
                    onChange={(amount) => setAmount(amount || 0)}
                  />
                </Form.Item>

                <Form.Item
                  label="Type"
                  style={{ width: "48%" }}
                  rules={[{ required: true }]}
                >
                  <Select
                    style={{ width: "100%" }}
                    placeholder="🟩 BUY  / 🟥 SELL "
                    defaultValue={transactionType}
                    onChange={(type) => setTransactionType(type)}
                    allowClear
                  >
                    <Option value="BUY">🟩 - BUY </Option>
                    <Option value="SELL">🟥 - SELL</Option>
                  </Select>
                </Form.Item>

                <Form.Item label="Date of transaction" style={{ width: "48%" }}>
                  <DatePicker
                    style={{ width: "100%" }}
                    defaultValue={dayjs()}
                    onChange={(date) => setDate(date || dayjs())}
                  />
                </Form.Item>

                <Form.Item
                  label="Wallet"
                  style={{ width: "48%" }}
                  rules={[{ required: true }]}
                >
                  <Select
                    style={{ width: "100%" }}
                    placeholder={
                      <>
                        <WalletOutlined style={{ marginRight: 5 }} />
                        Pick your wallet
                      </>
                    }
                    onChange={(id) => setWalletId(id)}
                    allowClear
                  >
                    {wallets
                      .filter((wallet: any) => wallet?.id)
                      .map((wallet: any) => (
                        <Option value={wallet?.id} key={wallet.id}>
                          {" "}
                          <WalletOutlined style={{ marginRight: 5 }} />{" "}
                          {wallet.name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              </Row>
            </Form>
            <Row>
              <Flex
                justify="flex-end"
                align="center"
                style={{
                  width: "100%",
                  marginBottom: 18,
                }}
              >
                <Typography style={{ marginRight: 16 }}>Sum </Typography>
                <Typography
                  style={{
                    fontWeight: 600,
                    padding: "5px 10px",
                    background: "#f2f2f2",
                    borderRadius: 5,
                  }}
                >
                  {getUsd(amount * Number(coin.priceUsd))}
                </Typography>
              </Flex>
            </Row>
          </>
        ) : null}
      </Modal>
    </>
  );
};

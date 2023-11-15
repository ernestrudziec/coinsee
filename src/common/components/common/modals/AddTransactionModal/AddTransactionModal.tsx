/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Checkbox,
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
import { getUsd } from "../../../../../utils/formatters";
import { useAuth } from "../../../../../context/auth/hooks/useAuth";
import { ChangeCell } from "../../cells/ChangeCell";
import { useNavigate } from "react-router";
import { PrivateRoutePath } from "../../../../../router/routes";
import { WalletOutlined } from "@ant-design/icons";
import { transactionApi } from "../../../../../database/firebase/api/transaction/transactionApi";
import { CoinData, TransactionType } from "../../../../types/entities";
import { BaseModalProps } from "../types";
import { useModal } from "../../../../../context/modal/hooks/useModal";
import { usePortfolio } from "../../../../../context/portfolio/hooks/usePortfolio";

const { Option } = Select;

export type AddTransactionModalProps = BaseModalProps;

export const AddTransactionModal = (props: AddTransactionModalProps) => {
  const coin = (props.data?.coin as CoinData) || [];
  const defaultWalletId = props.data?.walletId as string;

  const { isOpen } = props;

  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(dayjs());
  const [transactionType, setTransactionType] = useState<TransactionType>(
    TransactionType.BUY
  );
  const [walletId, setWalletId] = useState<string | null>(
    defaultWalletId || null
  );
  const [customPrice, setCustomPrice] = useState<number | null>(null);
  const [isCustomPrice, setIsCustomPrice] = useState<boolean>(false);

  const navigate = useNavigate();
  const { handleCloseModal } = useModal();
  const { currentUser } = useAuth();
  const {
    wallets: { data: wallets, hasAnyWallet },
    general: { refetch },
  } = usePortfolio();

  const resetForm = () => {
    setAmount(0);
    setDate(dayjs());
    setTransactionType(TransactionType.BUY);
    setWalletId(null);
    setCustomPrice(null);
    setIsCustomPrice(false);
  };

  const handleClose = () => {
    resetForm();
    handleCloseModal();
  };

  const handleOk = async () => {
    if (coin !== null && (walletId !== null || defaultWalletId !== null)) {
      if (isCustomPrice && customPrice !== null) {
        coin.priceUsd = String(customPrice);
      }

      await transactionApi.create({
        type: transactionType,
        uid: currentUser.uid,
        coin,
        walletId: walletId || defaultWalletId,
        amount,
        transactionDate: new Date(date.toISOString()),
      });
      handleClose();
      refetch();

      // if user is on the dashboard page navigate to wallet page
      !defaultWalletId && navigate(PrivateRoutePath.WALLET + "/" + walletId);
    }
  };

  return (
    <>
      <Modal
        title={"Add transaction"}
        centered
        open={isOpen}
        onOk={handleOk}
        onCancel={handleClose}
        okText="Add transaction"
        okButtonProps={{
          disabled: !(
            amount &&
            date &&
            (walletId || defaultWalletId) &&
            transactionType
          ),
        }}
      >
        {!wallets?.length ? (
          <>
            <Typography style={{ marginBottom: 16 }}>
              No wallet connected with your account.
            </Typography>

            <Button
              type="primary"
              onClick={() => {
                handleCloseModal();
                navigate(PrivateRoutePath.PORTFOLIO);
              }}
            >
              <WalletOutlined />
              Create new wallet
            </Button>
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
                    value={amount}
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
                    value={transactionType}
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
                    value={date}
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
                    disabled={defaultWalletId !== null}
                    value={defaultWalletId || walletId}
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
              <Row justify={"space-between"} wrap>
                <Form.Item
                  label="Maybe a different Coin's price?"
                  style={{ width: "48%" }}
                >
                  <Checkbox
                    style={{ width: "100%" }}
                    checked={isCustomPrice}
                    onChange={(e) => setIsCustomPrice(e.target.checked)}
                  >
                    Use custom price
                  </Checkbox>
                </Form.Item>
                <Form.Item
                  label="Custom price"
                  style={{ width: "48%", opacity: isCustomPrice ? 1 : 0.6 }}
                >
                  <InputNumber
                    disabled={!isCustomPrice}
                    style={{ width: "100%" }}
                    placeholder="Enter custom price (USD)"
                    prefix="$"
                    min={0}
                    value={customPrice}
                    onChange={(customPrice) => setCustomPrice(customPrice || 0)}
                  />
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
                  {getUsd(
                    amount * Number(isCustomPrice ? customPrice : coin.priceUsd)
                  )}
                </Typography>
              </Flex>
            </Row>
          </>
        ) : null}
      </Modal>
    </>
  );
};

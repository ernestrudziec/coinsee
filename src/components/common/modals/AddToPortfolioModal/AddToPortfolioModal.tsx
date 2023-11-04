import {
  DatePicker,
  Flex,
  Form,
  InputNumber,
  Modal,
  Row,
  Typography,
} from "antd";
import { Coin } from "../../../DashboardTable/types";
import { useEffect, useState } from "react";
import { ChangeCell } from "../../cells/ChangeCell";
import { IconCell } from "../../cells/IconCell";
import dayjs from "dayjs";
import { getUsd } from "../../../../utils/formatters";
import { addTransactionToUserPortfolio } from "../../../../firebase/api/addTransactionToUserPortfolio";
import { useAuth } from "../../../../context/auth/useAuth";

export type AddToPortfolioModalProps = {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  data: Coin | null;
};

export const AddToPortfolioModal = ({
  isOpen,
  setIsOpen,
  data: coin,
}: AddToPortfolioModalProps) => {
  useEffect(() => {
    console.log({ coin });
  }, [coin]);

  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(dayjs());

  const currentUser = useAuth();

  useEffect(() => {
    console.log({ currentUser });
    console.log({ amount, date });
  }, [amount, date, currentUser]);

  const handleOk = async () => {
    if (coin !== null) {
      console.log("adding!");
      await addTransactionToUserPortfolio({
        type: "BUY",
        uid: "3",
        coin,
        amount,
        wallet: "testWallet",
        transactionDate: new Date(date.toISOString()),
      });
      setIsOpen(false);
    }
  };

  return (
    <>
      <Modal
        title={"Add to portfolio"}
        centered
        open={isOpen}
        onOk={handleOk}
        onCancel={() => setIsOpen(false)}
        okText="Add to portfolio"
        okButtonProps={{ disabled: !(amount && date) }}
      >
        {coin && (
          <>
            <Flex
              justify="space-between"
              align="center"
              style={{
                background: "#f2f2f2",
                padding: "12px 24px",
                marginBottom: 10,
                borderRadius: 5,
              }}
            >
              <div style={{ fontWeight: 700, marginRight: 12 }}>
                {coin?.name}
              </div>
              <IconCell symbol={coin.symbol} name={coin.name} />
              <div>{getUsd(Number(coin.priceUsd))}</div>
              <div>
                <ChangeCell changePercent24Hr={coin.changePercent24Hr} />
              </div>
            </Flex>
            <Form style={{ padding: "10px 24px" }}>
              <Row>
                <Form.Item label="Amount">
                  <InputNumber
                    min={0}
                    onChange={(amount) => setAmount(amount || 0)}
                  />
                </Form.Item>
                <Form.Item label="Date of buy" style={{ marginLeft: 16 }}>
                  <DatePicker
                    defaultValue={dayjs()}
                    onChange={(date) => setDate(date || dayjs())}
                  />
                </Form.Item>
              </Row>
            </Form>
            <Row>
              <Flex
                justify="flex-end"
                align="center"
                style={{
                  padding: "10px 24px",
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
        )}
      </Modal>
    </>
  );
};

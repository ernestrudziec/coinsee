import { Button, Flex, Statistic, Typography } from "antd";
import dayjs from "dayjs";

import { useAuth } from "../../../../context/auth/hooks/useAuth";
import { UserDeleteOutlined } from "@ant-design/icons";
import { useModal } from "../../../../context/modal/hooks/useModal";
import { ModalType } from "../../../../context/modal/constants";

export const MyProfilePage = () => {
  const { currentUser } = useAuth();
  const { handleOpenModal } = useModal();

  const getDateString = (datestring: string) => {
    return dayjs(datestring).locale("en").format("DD MMMM YYYY HH:mm");
  };
  return (
    <Flex vertical style={{ padding: 20, minHeight: "calc(100vh - 178px)" }}>
      <Typography style={{ fontSize: 24, fontWeight: 700 }}>
        My profile
      </Typography>
      <Flex wrap="wrap" vertical>
        <Statistic
          title={"E-mail"}
          style={{ marginTop: 20, marginRight: 20 }}
          valueStyle={{ fontSize: 18 }}
          value={currentUser?.email}
        />
        <Statistic
          title={"Account created at"}
          style={{ marginTop: 20, marginRight: 20 }}
          valueStyle={{ fontSize: 18 }}
          value={getDateString(currentUser?.metadata.creationTime)}
        />
        <Statistic
          title={"Last login at"}
          style={{ marginTop: 20, marginRight: 20 }}
          valueStyle={{ fontSize: 18 }}
          value={getDateString(currentUser?.metadata.lastSignInTime)}
        />
      </Flex>
      <Flex style={{ marginTop: 20 }}>
        <Button
          type="primary"
          onClick={() => handleOpenModal({ type: ModalType.DELETE_ACCOUNT })}
        >
          <UserDeleteOutlined />
          Delete my account
        </Button>
      </Flex>
    </Flex>
  );
};

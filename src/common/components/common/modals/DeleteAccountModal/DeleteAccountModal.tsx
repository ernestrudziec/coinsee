/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { Modal, Typography } from "antd";
import { useNavigate } from "react-router";

import { useAuth } from "../../../../../context/auth/hooks/useAuth";

import { BaseModalProps } from "../types";
import { useModal } from "../../../../../context/modal/hooks/useModal";
import { Colors } from "../../../../constants/colors";
import { userApi } from "../../../../../database/firebase/api/user/userApi";
import { PublicRoutePath } from "../../../../../router/routes";
import { useUserState } from "../../../../../context/auth/hooks/useUserState";

export type DeleteAccountModalProps = BaseModalProps;

export const DeleteAccountModal = (props: DeleteAccountModalProps) => {
  const { isOpen } = props;

  const { handleCloseModal } = useModal();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const { setIsUserExpected } = useUserState({ isCurrentUser: currentUser });

  const [error, setError] = useState("");

  const handleClose = () => {
    handleCloseModal();
  };

  const handleOk = async () => {
    if (currentUser.uid !== null) {
      const result = await userApi.delete({
        currentUser,
      });

      console.log({ result });
      if (result as Error) {
        setError((result as Error).message);
      } else {
        setIsUserExpected(false);
        navigate(PublicRoutePath.LANDING);
      }
      window.location.reload();
    }
  };

  return (
    <>
      <Modal
        title={"Are you sure?"}
        centered
        open={isOpen}
        onOk={handleOk}
        onCancel={handleClose}
        okText="Delete account"
        okButtonProps={{
          style: { backgroundColor: Colors.RED },
        }}
      >
        <Typography>
          {error ? (
            <span style={{ color: Colors.RED }}>{error}</span>
          ) : (
            <>
              {" "}
              Please confirm that u want to delete your account.
              <br />
              <br />
              <span style={{ color: Colors.RED }}>
                {" "}
                This operation is irreversible.
              </span>
            </>
          )}
        </Typography>
      </Modal>
    </>
  );
};

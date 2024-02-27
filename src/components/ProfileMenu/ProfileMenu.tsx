import Button from "../../ui/Button/Button";
import { useAppDispatch } from "../../hooks/hooks";
import { userSignOut } from "../../store/authSlice/authSlice";
import styles from "./ProfileMenu.module.scss";
import Modal from "../../ui/Modal/Modal";
import { useState } from "react";
import ChangePassword from "../Forms/ChangePassword/ChangePassword";
import { useNavigate } from "react-router-dom";
function ProfileMenu() {
  const dispatch = useAppDispatch();

  const [showModal, setShowModal] = useState<boolean>(false);

  const navigate = useNavigate();

  return (
    <div className={styles["profile-menu"]}>
      <Button onClick={() => setShowModal(true)} size="md" variation="main">
        Change Password
      </Button>
      <Button
        onClick={(): void => {
          dispatch(userSignOut()).then(() => {
            navigate("/");
          });
        }}
        size="md"
        variation="main"
      >
        Sign Out
      </Button>
      {showModal && (
        <Modal handleShowModal={setShowModal}>
          <ChangePassword />
        </Modal>
      )}
    </div>
  );
}

export default ProfileMenu;

import Button from "../Button/Button";
import { useAppDispatch } from "../../hooks/hooks";
import { userSignOut } from "../../store/authSlice/authSlice";
import styles from "./ProfileMenu.module.scss";
import Modal from "../../ui/Modal/Modal";
import { useState } from "react";
import ChangePassword from "../Forms/ChangePassword/ChangePassword";
function ProfileMenu() {
  const dispatch = useAppDispatch();

  const [showModal, setShowModal] = useState(false);

  return (
    <div className={styles["profile-menu"]}>
      <Button onClick={() => setShowModal(true)} variation="secondary">
        Change Password
      </Button>
      <Button onClick={() => dispatch(userSignOut())} variation="secondary">
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

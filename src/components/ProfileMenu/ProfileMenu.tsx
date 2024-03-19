import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/hooks";
import { userSignOut } from "../../store/authSlice/authSlice";
import Button from "../../ui/Button/Button";
import styles from "./ProfileMenu.module.scss";
import Modal from "../../ui/Modal/Modal";
import ChangePassword from "../Forms/ChangePassword/ChangePassword";

function ProfileMenu() {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  return (
    <>
      <div className={styles["profile-menu"]}>
        <Modal>
          <Modal.Open opens="profile-menu">
            <Button size="sm" variation="primary">
              Change Password
            </Button>
          </Modal.Open>
          <Modal.Window name="profile-menu">
            <ChangePassword />
          </Modal.Window>
        </Modal>
        <Button
          onClick={(): void => {
            dispatch(userSignOut()).then(() => {
              navigate("/");
            });
          }}
          size="sm"
          variation="primary"
        >
          Sign Out
        </Button>
      </div>
    </>
  );
}

export default ProfileMenu;

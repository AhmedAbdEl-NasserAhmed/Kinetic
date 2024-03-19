import { useAppSelector } from "../../hooks/hooks";
import { useState } from "react";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import { HiPlay } from "react-icons/hi2";
import Container from "../../ui/Container/Container";
import { useNavigate } from "react-router-dom";
import styles from "./Nav.module.scss";

function Nav() {
  const { user } = useAppSelector((state) => state.authentication);

  const navigate = useNavigate();

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <nav className=" relative bg-blue-800 p-[2rem] ">
      <Container>
        <div className={styles["nav-container"]}>
          <div className="flex items-center gap-[1.5rem] sm:gap-[2rem]  md:gap-[4rem]">
            <span
              className="flex items-center gap-[0.5rem] text-white text-2xl cursor-pointer"
              onClick={() => navigate("/programs")}
            >
              Home
            </span>
            <span
              className="flex items-center gap-[0.5rem] text-white text-2xl cursor-pointer"
              onClick={() => setShowProfileMenu((profile) => !profile)}
            >
              My Profile
              <HiPlay className=" text-xl rotate-90" />
            </span>
          </div>
          <h1 className="text-2xl text-white">Welcome , {user?.displayName}</h1>

          {showProfileMenu && <ProfileMenu />}
        </div>
      </Container>
    </nav>
  );
}

export default Nav;

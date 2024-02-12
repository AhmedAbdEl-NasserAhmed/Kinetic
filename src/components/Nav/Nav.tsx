import { useAppSelector } from "../../hooks/hooks";
import { useState } from "react";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import { HiPlay } from "react-icons/hi2";

function Nav() {
  const { user } = useAppSelector((state) => state.authentication);

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <nav className=" relative bg-blue-800 p-[2rem] flex items-center justify-between">
      <h1 className="text-2xl text-white">Welcome , {user?.displayName}</h1>
      <span
        className="flex items-center gap-[0.5rem] text-white text-2xl cursor-pointer"
        onClick={() => setShowProfileMenu((profile) => !profile)}
      >
        My Profile
        <HiPlay className=" text-xl rotate-90" />
      </span>

      {showProfileMenu && <ProfileMenu />}
    </nav>
  );
}

export default Nav;

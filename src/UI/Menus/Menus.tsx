import { createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiEllipsisVertical } from "react-icons/hi2";
import styles from "./Menus.module.scss";
import useClickOutside from "../../hooks/useClickOutside";

interface PositionObject {
  x: number;
  y: number;
}

interface MenusContext {
  openId: string;
  close: (id: string) => void;
  openHandler: (id: string) => void;
  position: object;
  setPosition: (object: PositionObject) => void;
}

const MenusContext = createContext({} as MenusContext);

function Menus({ children }) {
  const [openId, setOpenId] = useState("");

  const [position, setPosition] = useState(null);

  const close = () => setOpenId("");

  const openHandler = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, openHandler, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

function Menu({ children }) {
  return <div className={styles["menus__menu"]}>{children}</div>;
}

function Toggle({ id }) {
  const { openId, close, setPosition, openHandler } = useContext(MenusContext);

  // function removeScrollingOpenMenu() {
  //   document.body.classList.add("stop-scrolling");

  //   console.log("id");
  // }

  // function addScrollingCloseMenu() {
  //   document.body.classList.remove("stop-scrolling");
  //   close("");
  // }

  function handleClick(e) {
    const rect = e.target.closest("button").getBoundingClientRect();

    setPosition({
      x: window.innerWidth - rect.width - rect.x + 20,
      y: rect.y + rect.height - 15,
    });

    console.log("openId", openId);

    openId === "" || openId !== id ? openHandler(id) : close("");
  }

  return (
    <button className={styles["menus__toggle"]} onClick={handleClick}>
      <HiEllipsisVertical />
    </button>
  );
}

function List({ id, children }) {
  const { openId, position, close } = useContext(MenusContext);

  const menuRef = useClickOutside({ close });

  if (openId !== id) return null;

  return createPortal(
    <ul
      ref={menuRef}
      style={{ right: `${position["x"]}px`, top: `${position["y"]}px` }}
      className={styles["menus__list"]}
    >
      {children}
    </ul>,
    document.body
  );
}

function MenusButton({ children, icon }) {
  const { close } = useContext(MenusContext);

  return (
    <div>
      <button
        className={styles["menus__button"]}
        onClick={() => {
          document.body.classList.remove("stop-scrolling");
          close("");
        }}
      >
        {icon}
        <span>{children}</span>
      </button>
    </div>
  );
}

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = MenusButton;

export default Menus;

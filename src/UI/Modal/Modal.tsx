import styles from "./Modal.module.scss";
import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";

interface Props {
  children: React.ReactNode;
  handleShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function Modal({ children, handleShowModal }: Props) {
  const menuRef = useRef<HTMLDivElement>();

  useEffect(() => {
    function handler(e: Event) {
      if (menuRef?.current?.contains(e.target as Node)) {
        handleShowModal(false);
      }
    }

    window.addEventListener("click", handler);

    return () => window.removeEventListener("click", handler);
  }, [menuRef, handleShowModal]);

  return createPortal(
    <div>
      <div className={styles.overlay} ref={menuRef}></div>
      <div className={styles.modal}>{children}</div>
    </div>,

    document.getElementById("modal")
  );
}

export default Modal;

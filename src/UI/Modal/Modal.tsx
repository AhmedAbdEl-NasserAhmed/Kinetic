import { cloneElement, createContext, useContext, useState } from "react";
import styles from "./Modal.module.scss";
import { createPortal } from "react-dom";
import useClickOutside from "../../hooks/useClickOutside";

interface ModalContext {
  openName: string;
  close: (openName: string) => void;
  openModal: (openName: string) => void;
}

const ModalContext = createContext({} as ModalContext);

function Modal({ children }) {
  const [openName, setopenName] = useState("");

  const close = () => setopenName("");

  const openModal = setopenName;

  return (
    <ModalContext.Provider value={{ openName, close, openModal }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: modalWindowName }) {
  const { openModal } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => openModal(modalWindowName) });
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);

  const modalRef = useClickOutside({ close, value: "", StopBubbling: true });

  if (openName !== name) return null;

  return createPortal(
    <div className={styles.overlay}>
      <div ref={modalRef} className={styles.modal}>
        <div>
          {cloneElement(children, {
            setShowModal: close,
          })}
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
}

Modal.Open = Open;

Modal.Window = Window;

export default Modal;

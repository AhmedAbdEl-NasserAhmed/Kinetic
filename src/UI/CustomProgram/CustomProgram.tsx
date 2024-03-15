import { HiOutlinePlusCircle } from "react-icons/hi2";
import styles from "./CustomProgram.module.scss";

interface Props {
  onClick?: () => void;
}

function CustomProgram({ onClick }: Props) {
  return (
    <div onClick={onClick} className={styles["custom-program"]}>
      <h2>Add your custom workout</h2>
      <span>
        <HiOutlinePlusCircle />
      </span>
    </div>
  );
}

export default CustomProgram;

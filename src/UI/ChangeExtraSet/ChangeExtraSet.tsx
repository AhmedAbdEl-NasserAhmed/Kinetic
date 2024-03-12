import { FaFireFlameSimple, FaFireFlameCurved } from "react-icons/fa6";
import styles from "./ChangeExtraSet.module.scss";

interface Props {
  activeSet: string;
  setToggleSets: (setName: string) => void;
  setShowSuperSetForm?: (boolen: boolean) => void;
  setShowDropSetForm?: (boolen: boolean) => void;
}

function ChangeExtraSet({
  activeSet,
  setToggleSets,
  setShowSuperSetForm,
  setShowDropSetForm,
}: Props) {
  return (
    <div className={styles["change-sets"]}>
      <span
        onClick={() => {
          setShowSuperSetForm(true);
          setShowDropSetForm(false);
          setToggleSets("superSet");
        }}
        className={`${styles["change-sets__super-set"]} ${
          activeSet === "superSet" ? "activeSet" : ""
        }`}
      >
        <FaFireFlameCurved />
      </span>
      <span
        onClick={() => {
          setShowDropSetForm(true);
          setShowSuperSetForm(false);
          setToggleSets("dropSet");
        }}
        className={`${styles["change-sets__drop-set"]} ${
          activeSet === "dropSet" ? "activeSet" : ""
        } `}
      >
        <FaFireFlameSimple />
      </span>
    </div>
  );
}

export default ChangeExtraSet;

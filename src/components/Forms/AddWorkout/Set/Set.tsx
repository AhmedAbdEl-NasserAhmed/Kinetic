import { useEffect, useState } from "react";
import styles from "./Set.module.scss";

function Set({ set, handleShowModal, setSelectedSet, sets, showModal }) {
  const [isPrevious, setIsPrevious] = useState<boolean>(true);

  useEffect(() => {
    setIsPrevious(
      set === sets[0] ? true : sets[sets.indexOf(set) - 1]?.isCompleted
    );
  }, [set, setIsPrevious, sets, showModal]);

  return (
    <div
      onClick={() => {
        setSelectedSet(set);
        handleShowModal(isPrevious);
      }}
      className={`${styles["set"]} ${
        isPrevious ? "bg-slate-100" : "bg-red-500"
      }  `}
    >
      {set.setsReps > 0 && <h2>{set.setsReps}</h2>}
      {set.setsWeight > 0 && (
        <h4>
          <span className="font-extrabold"> {set.setsWeight}</span>{" "}
          <span className="text-sm font-semibold">{set.weightUnit}</span>
        </h4>
      )}
    </div>
  );
}

export default Set;

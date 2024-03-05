import { useEffect, useState } from "react";
import styles from "./NewAddedSet.module.scss";

function NewAddedSet({
  set,
  handleShowSetDetailsModal,
  setSelectedSet,
  sets,
  showSetDetailsModal,
}) {
  const [isPrevious, setIsPrevious] = useState<boolean>(true);

  useEffect(() => {
    setIsPrevious(
      set === sets[0] ? true : sets[sets.indexOf(set) - 1]?.isCompleted
    );
  }, [set, setIsPrevious, sets, showSetDetailsModal]);

  return (
    <div
      onClick={() => {
        setSelectedSet(set);
        handleShowSetDetailsModal(isPrevious);
      }}
      className={`${styles["set"]} ${
        isPrevious
          ? `bg-slate-100 ${set.isCompleted ? "" : "not-complete"}`
          : "bg-red-500 not-complete "
      }`}
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

export default NewAddedSet;

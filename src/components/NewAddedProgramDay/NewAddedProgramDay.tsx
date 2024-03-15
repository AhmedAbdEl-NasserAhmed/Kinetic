import { useEffect, useState } from "react";
import styles from "./NewAddedProgramDay.module.scss";

function NewAddedProgramDay({
  programDay,
  setShowDayDetails,
  setSelectedDay,
  programDays,
  showDayDetails,
}) {
  const [isPrevious, setIsPrevious] = useState<boolean>(true);

  useEffect(() => {
    setIsPrevious(
      programDay === programDays[0]
        ? true
        : programDays[programDays.indexOf(programDay) - 1]?.isCompleted
    );
  }, [programDay, setIsPrevious, programDays, showDayDetails]);

  console.log("programDay", programDay);

  console.log("isPrevious", isPrevious);

  return (
    <div
      onClick={() => {
        setSelectedDay(programDay);
        setShowDayDetails(isPrevious);
      }}
      className={`${styles["programDay"]} ${
        isPrevious
          ? `bg-slate-100 ${programDay.isCompleted ? "" : "not-complete"}`
          : "bg-red-500 not-complete "
      }`}
    >
      {programDay.name && (
        <div className={styles["programDay__details-container"]}>
          <h2>{programDay.name}</h2>
          <h4>Day</h4>
        </div>
      )}
    </div>
  );
}

export default NewAddedProgramDay;

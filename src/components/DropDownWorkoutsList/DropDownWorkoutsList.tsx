import { useParams } from "react-router-dom";
import { useAppSelector } from "../../hooks/hooks";
import { useFetchWorkoutsQuery } from "../../services/workoutApi";
import styles from "./DropDownWorkoutsList.module.scss";
import useClickOutside from "../../hooks/useClickOutside";
import { useEffect } from "react";

function DropDownWorkoutsList({
  setComparableWorkoutName,
  setShowPreviousWorkouts,
  formData,
  clearErrors,
}) {
  const { user } = useAppSelector((state) => state.authentication);

  const { name } = useParams();

  const { data } = useFetchWorkoutsQuery({
    workoutCategory: name,
    userId: user?.uuid || user?.uid,
  });

  const categorizedWorkouts = groupBy("tragetedMuscle", "workoutName", data);

  function groupBy(key = "name", keyValue, data) {
    const result = {};

    for (const item of data) {
      const categoryKey = item[key];

      if (categoryKey in result) {
        result[categoryKey] = [
          ...new Set(result[categoryKey].concat(item[keyValue])),
        ];
      } else {
        result[categoryKey] = [item[keyValue]];
      }
    }

    return result;
  }

  const ref = useClickOutside({
    close: setShowPreviousWorkouts,
    value: false,
    StopBubbling: true,
  });

  useEffect(() => {
    if (!formData["workoutName"]) {
      setComparableWorkoutName("");
    }
  }, [formData, setComparableWorkoutName]);

  return (
    <div ref={ref} className={styles["drop-list-container"]}>
      {Object.keys(categorizedWorkouts).map((targetedMuscleKey) => {
        return (
          <div key={targetedMuscleKey}>
            <h2 className="text-4xl uppercase mb-5">{targetedMuscleKey}</h2>

            <ul className={styles["drop-list-container__list"]}>
              {categorizedWorkouts[targetedMuscleKey]
                .filter((workoutName) =>
                  String(workoutName)
                    .toLocaleLowerCase()
                    .includes(
                      String(formData["workoutName"]).toLocaleLowerCase()
                    )
                )
                .map((workoutName) => {
                  return (
                    <li
                      onClick={() => {
                        setComparableWorkoutName(workoutName);
                        setShowPreviousWorkouts(false);
                        clearErrors("workoutName");
                      }}
                      key={workoutName}
                    >
                      {workoutName}
                    </li>
                  );
                })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

export default DropDownWorkoutsList;

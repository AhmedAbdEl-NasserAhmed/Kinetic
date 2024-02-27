import { WorkoutObject } from "../../../interfaces/interfaces";
import styles from "./BasicWorkoutItem.module.scss";
import { HiDotsVertical } from "react-icons/hi";

interface Props {
  workout: WorkoutObject;
}

function BasicWorkoutItem({ workout }: Props) {
  const totalReps = workout.sets.reduce((acc, set) => acc + set["setsReps"], 0);

  const totalWeights = workout.sets.reduce(
    (acc, set) => acc + set["setsWeight"],
    0
  );

  return (
    <li className={styles["workout-item"]}>
      <div className="flex flex-col gap-8">
        <h2 className={styles["workout-item__name"]}>{workout.workoutName}</h2>
        <div className="flex items-center gap-[2rem]">
          <h4 className={styles["workout-item__details"]}>
            Sets:{" "}
            <span className="text-blue-800 font-bold">
              {workout.sets.length}
            </span>
          </h4>
          <h4 className={styles["workout-item__details"]}>
            Total Reps:{" "}
            <span className="text-blue-800 font-bold">{totalReps}</span>
          </h4>
          <h4 className={styles["workout-item__details"]}>
            Total Weight Lifted:{" "}
            <span className="text-blue-800 font-bold">{totalWeights}</span>
          </h4>
        </div>
      </div>
      <div>
        <span className="text-3xl cursor-pointer">
          <HiDotsVertical />
        </span>
      </div>
    </li>
  );
}

export default BasicWorkoutItem;

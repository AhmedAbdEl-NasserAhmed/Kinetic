import DetailedSet from "../../../components/Forms/CreateWorkout/Set/DetailedSet/DetailedSet";
import HiddenRadioButton from "../../../components/HiddenRadioButton/HiddenRadioButton";
import { radioButtons } from "../../../constants/RadioButtons";
import { WorkoutObject } from "../../../interfaces/interfaces";
import styles from "./BasicWorkoutDetails.module.scss";

interface Props {
  workout: WorkoutObject;
}

function BasicWorkoutDetails({ workout }: Props) {
  const targetedMuscle = radioButtons.find(
    (targetedMuscle) => targetedMuscle.value === workout.tragetedMuscle
  );

  const totalReps = workout.sets.reduce(
    (acc, set) => acc + Number(set["setsReps"]),
    0
  );

  const totalWeights = workout.sets.reduce(
    (acc, set) => acc + Number(set["setsWeight"]),
    0
  );

  return (
    <div className={styles["basicWorkout-details"]}>
      <div className={styles["basicWorkout-details__container"]}>
        <h6 className="text-3xl font-bold text-slate-500 bg-slate-200 p-5 text-center  rounded-lg">
          Workout Details
        </h6>
        <div>
          <h2 className="text-3xl font-bold mb-3">{workout.workoutName}</h2>
          <hr />
        </div>
        <div>
          <h2 className="text-3xl font-bold mb-8 uppercase ">
            Targeted Muscle :
          </h2>
          <HiddenRadioButton
            className={targetedMuscle.id === workout.tragetedMuscle}
            label={targetedMuscle.label}
          />
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="text-3xl font-bold mb-8 uppercase">
            Num of Sets :{" "}
            <span className="text-blue-800">{workout.sets.length}</span>
          </h2>
          <div className="flex items-center flex-wrap gap-[3rem]">
            {workout.sets.map((set) => (
              <DetailedSet key={set.id} set={set} />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-[8rem]">
          <div className="flex items-center text-center bg-slate-100  rounded-lg  text-2xl font-semibold">
            <span className="text-blue-800 p-2 ">Weights</span>
            <span className="bg-blue-800 p-2 rounded-lg w-[8rem]  self-stretch text-white">
              {totalWeights}
            </span>
          </div>
          <div className="flex items-center text-center bg-slate-100 w-[20%] rounded-lg  text-2xl font-semibold">
            <span className="text-blue-800 p-2  ">Reps</span>
            <span className="bg-blue-800 p-2 rounded-lg w-[20rem] h-full text-white">
              {totalReps}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BasicWorkoutDetails;

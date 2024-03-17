import { FaFireFlameCurved } from "react-icons/fa6";
import styles from "./SuperSetDetails.module.scss";
import DetailedSet from "../../../components/Forms/CreateWorkout/Set/DetailedSet/DetailedSet";
import HiddenRadioButton from "../../../components/HiddenRadioButton/HiddenRadioButton";
import { WorkoutObject } from "../../../interfaces/interfaces";
import { radioButtons } from "../../../constants/RadioButtons";

interface Props {
  workout: WorkoutObject;
}

function SuperSetDetails({ workout }: Props) {
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

  const totalSuperSetReps = workout.superSets?.reduce(
    (acc, set) => acc + Number(set["setsReps"]),
    0
  );

  const totalSuperSetWeights = workout.superSets?.reduce(
    (acc, set) => acc + Number(set["setsWeight"]),
    0
  );

  return (
    <div className={styles["superSet-details"]}>
      <div className={styles["superSet-details__container"]}>
        <h6 className="text-3xl font-bold text-slate-500 bg-slate-200 p-5 text-center  rounded-lg">
          Super Set Workout Details
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

      <div className="bg-slate-200 p-[2rem] flex flex-col gap-[8rem]">
        <div className="flex items-center justify-between">
          <h2 className="text-5xl font-extrabold text-blue-800">Super Set</h2>
          <span className="text-3xl bg-blue-800 p-4 rounded-lg text-white">
            <FaFireFlameCurved />
          </span>
        </div>
        <div>
          <h2 className="text-4xl font-extrabold text-blue-800 ">
            {workout.superSetName}
          </h2>
          <hr />
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="text-3xl font-bold mb-8 uppercase">
            Num of Sets :{" "}
            <span className="text-blue-800">{workout.superSets?.length}</span>
          </h2>
          <div className="flex items-center flex-wrap gap-[3rem]">
            {workout.superSets?.map((set) => (
              <DetailedSet key={set.id} set={set} />
            ))}
          </div>
        </div>
        <div className="flex items-center gap-[8rem]">
          <div className="flex items-center text-center bg-slate-100  rounded-lg  text-2xl font-semibold">
            <span className="text-blue-800 p-2 ">Weights</span>
            <span className="bg-blue-800 p-2 rounded-lg w-[8rem]  self-stretch text-white">
              {totalSuperSetWeights}
            </span>
          </div>
          <div className="flex items-center text-center bg-slate-100 w-[20%] rounded-lg  text-2xl font-semibold">
            <span className="text-blue-800 p-2  ">Reps</span>
            <span className="bg-blue-800 p-2 rounded-lg w-[20rem] h-full text-white">
              {totalSuperSetReps}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuperSetDetails;

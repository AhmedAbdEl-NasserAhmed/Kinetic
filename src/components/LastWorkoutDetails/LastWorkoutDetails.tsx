import styles from "./LastWorkoutDetails.module.scss";
import useClickOutside from "../../hooks/useClickOutside";
import { radioButtons } from "../../constants/RadioButtons";
import HiddenRadioButton from "../HiddenRadioButton/HiddenRadioButton";
import DetailedSet from "../Forms/CreateWorkout/Set/DetailedSet/DetailedSet";

function LastWorkoutDetails({ lastWorkout, setShowWorkoutDetails }) {
  const ref = useClickOutside({
    close: setShowWorkoutDetails,
    value: false,
    StopBubbling: true,
  });

  const targetedMuscle = radioButtons.find(
    (targetedMuscle) => targetedMuscle.value === lastWorkout?.tragetedMuscle
  );

  const totalReps = lastWorkout?.sets?.reduce(
    (acc, set) => acc + Number(set["setsReps"]),
    0
  );

  const totalWeights = lastWorkout?.sets?.reduce(
    (acc, set) => acc + Number(set["setsWeight"]),
    0
  );

  return (
    <div>
      <div ref={ref} className={styles["lastWorkout-details"]}>
        <div className="flex items-center text-2xl sm:text-3xl font-bold justify-between text-slate-500 bg-slate-200 p-5 text-center  rounded-lg  ">
          <h6>Last Workout Details</h6>
          <h2>{lastWorkout?.workoutTime}</h2>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-3">
            {lastWorkout?.workoutName}
          </h2>
          <hr />
        </div>
        <div>
          <h2 className=" text-2xl sm:text-3xl font-bold mb-8 uppercase ">
            Targeted Muscle :
          </h2>
          <HiddenRadioButton
            className={targetedMuscle?.id === lastWorkout?.tragetedMuscle}
            label={targetedMuscle?.label}
          />
        </div>
        <div className="flex flex-col gap-5">
          <h2 className="text-2xl sm:text-3xl font-bold mb-8 uppercase">
            Num of Sets :{" "}
            <span className="text-blue-800">{lastWorkout?.sets?.length}</span>
          </h2>
          <div className="flex items-center flex-wrap gap-[3rem]">
            {lastWorkout?.sets?.map((set) => (
              <DetailedSet key={set.id} set={set} />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-5 sm:flex-row items-center sm:gap-[8rem]">
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
      <span className={styles["overlay"]}>&nbsp;</span>
    </div>
  );
}

export default LastWorkoutDetails;

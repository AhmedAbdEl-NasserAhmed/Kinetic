import { useEffect } from "react";
import { useFetchWorkoutsQuery } from "../services/workoutApi";
import { useParams } from "react-router-dom";
import { useAppSelector } from "./hooks";

function useSetLastWorkout(comparableWorkoutName, setLastWorkout) {
  const { user } = useAppSelector((state) => state.authentication);

  const { name } = useParams();

  const { data } = useFetchWorkoutsQuery({
    workoutCategory: name,
    userId: user?.uuid || user?.uid,
  });

  const arrangedData = data.slice().sort((workoutItem1, workoutItem2) => {
    const date1 = new Date(workoutItem1.workoutTime);

    const date2 = new Date(workoutItem2.workoutTime);

    return date2.getTime() - date1.getTime();
  });

  useEffect(() => {
    if (comparableWorkoutName === "") return;
    setLastWorkout(
      arrangedData.find(
        (workout) => workout.workoutName === comparableWorkoutName
      )
    );
  }, [arrangedData, comparableWorkoutName, setLastWorkout]);
}

export default useSetLastWorkout;

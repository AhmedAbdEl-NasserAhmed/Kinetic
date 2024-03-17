import BasicWorkoutDetails from "../../features/BasicWorkoutItem/BasicWorkoutDetails/BasicWorkoutDetails";
import DropSetDetails from "../../features/DropSet/DropSetDetails/DropSetDetails";
import SuperSetDetails from "../../features/SuperSet/SuperSetDetails/SuperSetDetails";
import { WorkoutObject } from "../../interfaces/interfaces";

interface Props {
  workout: WorkoutObject;
}

function WorkoutDetails({ workout }: Props) {
  switch (workout.workoutType) {
    case "basic":
      return <BasicWorkoutDetails workout={workout} />;
    case "dropSet":
      return <DropSetDetails workout={workout} />;
    case "superSet":
      return <SuperSetDetails workout={workout} />;
  }

  return <BasicWorkoutDetails workout={workout} />;
}

export default WorkoutDetails;

import { WorkoutObject } from "../../../interfaces/interfaces";
import BasicWorkoutItem from "../../BasicWorkoutItem/BasicWorkoutItem";
import SuperSetWorkoutItem from "../../../features/SuperSet/SuperSetWorkoutItem/SuperSetWorkoutItem";
import DropSetWorkoutItem from "../../../features/DropSet/DropSetWorkoutItem/DropSetWorkoutItem";

interface Props {
  workout: WorkoutObject;
}

function RenderWorkoutTypeItem({ workout }: Props) {
  switch (workout.workoutType) {
    case "basic":
      return <BasicWorkoutItem workout={workout} />;
    case "superSet":
      return <SuperSetWorkoutItem workout={workout} />;
    case "dropSet":
      return <DropSetWorkoutItem workout={workout} />;

    default:
      <BasicWorkoutItem workout={workout} />;
  }
}

export default RenderWorkoutTypeItem;

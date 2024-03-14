import { WorkoutObject } from "../../../interfaces/interfaces";
import RenderWorkoutTypeItem from "../RenderWorkoutTypeItem/RenderWorkoutTypeItem";

interface Props {
  workouts: WorkoutObject[];
  currentDateIndex: string;
}

function WorkoutsList({ workouts, currentDateIndex }: Props) {
  return (
    <ul className=" flex flex-col gap-[3rem] my-[4rem]">
      {workouts
        ?.filter((workout) => workout.workoutTime === currentDateIndex)
        .map((workout) => (
          <RenderWorkoutTypeItem key={workout.id} workout={workout} />
        ))}
    </ul>
  );
}

export default WorkoutsList;

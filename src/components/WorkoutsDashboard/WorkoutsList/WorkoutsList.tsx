import { WorkoutObject } from "../../../interfaces/interfaces";
import RenderWorkoutTypeItem from "../RenderWorkoutTypeItem/RenderWorkoutTypeItem";

interface Props {
  workouts: WorkoutObject[];
}

function WorkoutsList({ workouts }: Props) {
  return (
    <ul className=" flex flex-col gap-[3rem] my-[4rem]">
      {workouts.map((workout) => (
        <RenderWorkoutTypeItem key={workout.id} workout={workout} />
      ))}
    </ul>
  );
}

export default WorkoutsList;

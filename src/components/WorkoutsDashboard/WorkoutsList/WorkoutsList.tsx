import BasicWorkoutItem from "../BasicWorkoutItem/BasicWorkoutItem";
import { WorkoutObject } from "../../../interfaces/interfaces";

interface Props {
  workouts: WorkoutObject[];
}

function WorkoutsList({ workouts }: Props) {
  return (
    <ul className=" flex flex-col gap-[3rem] my-[4rem]">
      {workouts.map((workout) => (
        <BasicWorkoutItem key={workout.id} workout={workout} />
      ))}
    </ul>
  );
}

export default WorkoutsList;

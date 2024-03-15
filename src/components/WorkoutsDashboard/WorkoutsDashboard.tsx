import { useAppSelector } from "../../hooks/hooks";
import { useFetchWorkoutsQuery } from "../../services/workoutApi";
import { useParams } from "react-router-dom";
import Spinner from "../../ui/Spinner/Spinner";
import Container from "../../ui/Container/Container";
import WorkoutsList from "./WorkoutsList/WorkoutsList";
import Menus from "../../ui/Menus/Menus";
import DateSlider from "../../ui/DateSlider/DateSlider";
import AddWorkout from "../../features/AddWorkout";
import { useState } from "react";

function WorkoutsDashboard() {
  const today = new Date(Date.now()).toDateString();

  const [currentDateIndex, setCurrentDateIndex] = useState<string>();

  const { user } = useAppSelector((state) => state.authentication);

  const { name } = useParams();

  const { data, isLoading, isFetching } = useFetchWorkoutsQuery({
    workoutCategory: name,
    userId: user?.uuid || user?.uid,
  });

  if (isLoading || isFetching)
    return <Spinner borderColor="#1e40af" width="46" height="46" margin="15" />;

  return (
    <div>
      <DateSlider
        currentDateIndex={currentDateIndex}
        setCurrentDateIndex={setCurrentDateIndex}
        data={data}
        today={today}
      />
      {today === currentDateIndex && <AddWorkout />}
      <Container>
        <Menus>
          <WorkoutsList currentDateIndex={currentDateIndex} workouts={data} />
        </Menus>
      </Container>
    </div>
  );
}

export default WorkoutsDashboard;

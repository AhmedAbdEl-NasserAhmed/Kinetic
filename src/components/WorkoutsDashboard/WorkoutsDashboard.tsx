import { useAppSelector } from "../../hooks/hooks";
import { useFetchWorkoutsQuery } from "../../services/workoutApi";
import { useParams } from "react-router-dom";
import Spinner from "../../ui/Spinner/Spinner";
import Container from "../../ui/Container/Container";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi";
import WorkoutsList from "./WorkoutsList/WorkoutsList";
import Menus from "../../ui/Menus/Menus";

function WorkoutsDashboard() {
  const { user } = useAppSelector((state) => state.authentication);

  const { name } = useParams();

  const { data, isLoading, isFetching } = useFetchWorkoutsQuery({
    workoutCategory: name,
    userId: user?.uuid || user?.uid,
  });

  if (isLoading || isFetching) return <Spinner />;

  return (
    <div>
      <div className=" bg-gray-300 text-3xl px-5 py-5 flex items-center justify-between">
        <span>{<HiArrowLeft />}</span>
        <p>Today</p>
        <span>{<HiArrowRight />}</span>
      </div>
      <Container>
        <Menus>
          <WorkoutsList workouts={data} />
        </Menus>
      </Container>
    </div>
  );
}

export default WorkoutsDashboard;

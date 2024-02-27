import { useEffect } from "react";
import { useAppSelector } from "../../hooks/hooks";
import { useFetchWorkoutsQuery } from "../../services/workoutApi";
import { useParams } from "react-router-dom";
import Spinner from "../../ui/Spinner/Spinner";
import Container from "../../ui/Container/Container";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi";
import WorkoutsList from "./WorkoutsList/WorkoutsList";

function WorkoutsDashboard({ showModal }) {
  const { user } = useAppSelector((state) => state.authentication);

  const { name } = useParams();

  const { data, isLoading, refetch } = useFetchWorkoutsQuery({
    workoutCategory: name,
    userId: user?.uuid || user?.uid,
  });

  useEffect(() => {
    refetch();
  }, [refetch, showModal]);

  if (isLoading) return <Spinner />;

  return (
    <div>
      <div className=" bg-gray-300 text-3xl px-5 py-5 flex items-center justify-between">
        <span>{<HiArrowLeft />}</span>
        <p>Today</p>
        <span>{<HiArrowRight />}</span>
      </div>
      <Container>
        <WorkoutsList workouts={data} />
      </Container>
    </div>
  );
}

export default WorkoutsDashboard;

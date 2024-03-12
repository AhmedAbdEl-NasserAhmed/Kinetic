import { WorkoutObject } from "../../interfaces/interfaces";
import { useDeleteWorkoutMutation } from "../../services/workoutApi";
import Button from "../../ui/Button/Button";
import Spinner from "../../ui/Spinner/Spinner";
import styles from "./DeleteWorkout.module.scss";

interface Props {
  setShowModal?: () => void;
  workout: WorkoutObject;
}

function DeleteWorkout({ workout, setShowModal }: Props) {
  const [deleteWorkout, response] = useDeleteWorkoutMutation();

  return (
    <div className={styles["delete-workout"]}>
      <h2 className="text-[2.5rem] font-extrabold leading-[4rem]">
        Are you sure that you want to Delete this workout ?
      </h2>
      <div className="flex justify-center gap-7">
        <Button
          onClick={() => deleteWorkout(workout.id)}
          variation="danger"
          size="md"
        >
          {response.isLoading ? (
            <Spinner height="20" width="20" borderColor="white" />
          ) : (
            "Delete"
          )}
        </Button>
        <Button
          disabled={response.isLoading}
          onClick={setShowModal}
          variation="secondary"
          size="md"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default DeleteWorkout;

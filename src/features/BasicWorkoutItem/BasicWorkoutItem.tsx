import { WorkoutObject } from "../../interfaces/interfaces";
import { HiMiniEye, HiTrash, HiMiniPencilSquare } from "react-icons/hi2";

import Menus from "../../ui/Menus/Menus";
import Modal from "../../ui/Modal/Modal";
import styles from "./BasicWorkoutItem.module.scss";
import DeleteWindow from "../../components/DeleteWindow/DeleteWindow";
import { useDeleteWorkoutMutation } from "../../services/workoutApi";
import WorkoutDetails from "../../components/WorkoutDetails/WorkoutDetails";
import UpdateBasicWorkoutItem from "./UpdateBasicWorkoutItem/UpdateBasicWorkoutItem";

interface Props {
  workout: WorkoutObject;
}

function BasicWorkoutItem({ workout }: Props) {
  const [deleteWorkout, response] = useDeleteWorkoutMutation();

  const totalReps = workout.sets.reduce(
    (acc, set) => acc + Number(set["setsReps"]),
    0
  );

  const totalWeights = workout.sets.reduce(
    (acc, set) => acc + Number(set["setsWeight"]),
    0
  );

  return (
    <li className={styles["workout-item"]}>
      <div className="flex flex-col gap-8">
        <h2 className={styles["workout-item__name"]}>{workout.workoutName}</h2>
        <div className="flex flex-col sm:flex-row sm:items-center gap-[2rem]">
          <h4 className={styles["workout-item__details"]}>
            Sets:{" "}
            <span className="text-blue-800 font-bold">
              {workout.sets.length}
            </span>
          </h4>
          <h4 className={styles["workout-item__details"]}>
            Total Reps:{" "}
            <span className="text-blue-800 font-bold">
              {Math.round(Number(totalReps))}
            </span>
          </h4>
          <h4 className={styles["workout-item__details"]}>
            Total Weight Lifted:{" "}
            <span className="text-blue-800 font-bold">
              {Math.round(Number(totalWeights))}
            </span>
          </h4>
        </div>
      </div>

      <Modal>
        <Menus.Menu>
          <Menus.Toggle id={workout.id} />

          <Menus.List id={workout.id}>
            <Modal.Open opens="details">
              <Menus.Button icon={<HiMiniEye />}>Details</Menus.Button>
            </Modal.Open>

            <Modal.Open opens="edit">
              <Menus.Button icon={<HiMiniPencilSquare />}>Edit</Menus.Button>
            </Modal.Open>

            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>

          <Modal.Window name="details">
            <WorkoutDetails workout={workout} />
          </Modal.Window>

          <Modal.Window name="edit">
            <UpdateBasicWorkoutItem workout={workout} />
          </Modal.Window>

          <Modal.Window name="delete">
            <DeleteWindow
              deleteFC={deleteWorkout}
              response={response}
              deletedItem={workout}
            />
          </Modal.Window>
        </Menus.Menu>
      </Modal>
    </li>
  );
}

export default BasicWorkoutItem;

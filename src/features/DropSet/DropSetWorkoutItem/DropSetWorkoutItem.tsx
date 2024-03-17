import styles from "./DropSetWorkoutItem.module.scss";
import { HiMiniEye, HiMiniPencilSquare, HiTrash } from "react-icons/hi2";
import { WorkoutObject } from "../../../interfaces/interfaces";
import Menus from "../../../ui/Menus/Menus";
import Modal from "../../../ui/Modal/Modal";
import { FaFireFlameSimple } from "react-icons/fa6";
import DeleteWindow from "../../../components/DeleteWindow/DeleteWindow";
import { useDeleteWorkoutMutation } from "../../../services/workoutApi";
import WorkoutDetails from "../../../components/WorkoutDetails/WorkoutDetails";

interface Props {
  workout: WorkoutObject;
}

function DropSetWorkoutItem({ workout }: Props) {
  const [deleteWorkout, response] = useDeleteWorkoutMutation();

  const totalReps = workout.sets.reduce(
    (acc, set) => acc + Number(set["setsReps"]),
    0
  );

  const totalWeights = workout.sets.reduce(
    (acc, set) => acc + Number(set["setsWeight"]),
    0
  );
  const totalDropSetReps = workout.dropSets.reduce(
    (acc, set) => acc + Number(set["setsReps"]),
    0
  );

  const totalDropSetWeights = workout.dropSets.reduce(
    (acc, set) => acc + Number(set["setsWeight"]),
    0
  );

  return (
    <li className={styles["dropSet-container"]}>
      <span className={styles["dropSet-container__icon"]}>
        <h2>Drop Set</h2>
        <FaFireFlameSimple />
      </span>
      <div className="flex flex-col  gap-3">
        <div className={styles["dropSet-container__normal-set"]}>
          <div>
            <h2 className="text-[4rem] font-extrabold mb-[2rem]">
              {workout.workoutName}
            </h2>
            <div className="flex gap-10">
              <span>
                Sets :{" "}
                <span className="text-blue-800"> {workout.sets.length}</span>
              </span>
              <span>
                {" "}
                Total Reps: <span className="text-blue-800"> {totalReps}</span>
              </span>
              <span>
                {" "}
                Total Weight Lifted:{" "}
                <span className="text-blue-800"> {totalWeights}</span>
              </span>
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
                  <Menus.Button icon={<HiMiniPencilSquare />}>
                    Edit
                  </Menus.Button>
                </Modal.Open>

                <Modal.Open opens="delete">
                  <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
                </Modal.Open>
              </Menus.List>

              <Modal.Window name="details">
                <WorkoutDetails workout={workout} />
              </Modal.Window>

              <Modal.Window name="delete">
                <DeleteWindow
                  response={response}
                  deleteFC={deleteWorkout}
                  deletedItem={workout}
                />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
        <div className={styles["dropSet-container__extra-set"]}>
          <div>
            <div className="flex gap-10">
              <span>
                Sets :{" "}
                <span className="text-blue-800">
                  {" "}
                  {workout.dropSets.length}
                </span>
              </span>
              <span>
                {" "}
                Total Reps:{" "}
                <span className="text-blue-800"> {totalDropSetReps}</span>
              </span>
              <span>
                {" "}
                Total Weight Lifted:{" "}
                <span className="text-blue-800"> {totalDropSetWeights}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default DropSetWorkoutItem;

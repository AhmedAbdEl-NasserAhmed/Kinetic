import styles from "./SuperSetWorkoutItem.module.scss";
import { HiMiniEye, HiMiniPencilSquare, HiTrash } from "react-icons/hi2";
import { WorkoutObject } from "../../../interfaces/interfaces";
import Menus from "../../../ui/Menus/Menus";
import Modal from "../../../ui/Modal/Modal";
import { FaFireFlameCurved } from "react-icons/fa6";
import DeleteWindow from "../../../components/DeleteWindow/DeleteWindow";
import { useDeleteWorkoutMutation } from "../../../services/workoutApi";
import WorkoutDetails from "../../../components/WorkoutDetails/WorkoutDetails";

interface Props {
  workout: WorkoutObject;
}

function SuperSetWorkoutItem({ workout }: Props) {
  const [deleteWorkout, response] = useDeleteWorkoutMutation();

  const totalReps = workout.sets.reduce(
    (acc, set) => acc + Number(set["setsReps"]),
    0
  );

  const totalWeights = workout.sets.reduce(
    (acc, set) => acc + Number(set["setsWeight"]),
    0
  );
  const totalSuperSetReps = workout.superSets.reduce(
    (acc, set) => acc + Number(set["setsReps"]),
    0
  );

  const totalSuperSetWeights = workout.superSets.reduce(
    (acc, set) => acc + Number(set["setsWeight"]),
    0
  );

  return (
    <li className={styles["superSet-container"]}>
      <span className={styles["superSet-container__icon"]}>
        <h2>Super Set</h2>
        <FaFireFlameCurved />
      </span>
      <div className="flex flex-col  gap-3">
        <div className={styles["superSet-container__normal-set"]}>
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
                  deleteFC={deleteWorkout}
                  response={response}
                  deletedItem={workout}
                />
              </Modal.Window>
            </Menus.Menu>
          </Modal>
        </div>
        <div className={styles["superSet-container__extra-set"]}>
          <div>
            <h2 className="text-[4rem] font-extrabold mb-[2rem] text-blue-800">
              {workout.superSetName}
            </h2>
            <div className="flex gap-10">
              <span>
                Sets :{" "}
                <span className="text-blue-800">
                  {" "}
                  {workout.superSets.length}
                </span>
              </span>
              <span>
                {" "}
                Total Reps:{" "}
                <span className="text-blue-800"> {totalSuperSetReps}</span>
              </span>
              <span>
                {" "}
                Total Weight Lifted:{" "}
                <span className="text-blue-800"> {totalSuperSetWeights}</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default SuperSetWorkoutItem;

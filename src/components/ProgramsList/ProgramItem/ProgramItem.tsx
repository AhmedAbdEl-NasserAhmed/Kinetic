import { Link } from "react-router-dom";
import styles from "./ProgramItem.module.scss";
import Button from "../../../ui/Button/Button";
import Modal from "../../../ui/Modal/Modal";
import DeleteWindow from "../../DeleteWindow/DeleteWindow";
import { CustomProgram } from "../../../interfaces/interfaces";
import { useDeleteProgramMutation } from "../../../services/programsApi";

interface Props {
  program: CustomProgram;
}

function ProgramItem({ program }: Props) {
  const [deleteWorkout, response] = useDeleteProgramMutation();

  return (
    <div className="relative">
      {program.isCustom && (
        <Modal>
          <Modal.Open opens="delete-program">
            <div className={styles["program-item__delete"]}>
              <Button type="button" size="sm" variation="danger">
                X
              </Button>
            </div>
          </Modal.Open>
          <Modal.Window name="delete-program">
            <DeleteWindow
              deleteFC={deleteWorkout}
              response={response}
              deletedItem={program}
            />
          </Modal.Window>
        </Modal>
      )}
      <Link to={`/programs/${program?.id}`}>
        <li className={styles["program-item"]}>
          <div>
            <h1 className={styles["program-item__heading"]}>
              {program?.name?.toUpperCase()}
            </h1>
            <p>Program</p>
          </div>
        </li>
      </Link>
    </div>
  );
}

export default ProgramItem;

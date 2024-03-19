import { CustomProgram, WorkoutObject } from "../../interfaces/interfaces";
import Button from "../../ui/Button/Button";
import Spinner from "../../ui/Spinner/Spinner";
import styles from "./DeleteWindow.module.scss";

interface Props {
  setShowModal?: () => void;
  deleteFC?: (id: string) => void;
  deletedItem?: CustomProgram | WorkoutObject;
  response: {
    isLoading: boolean;
  };
}

function DeleteWindow({
  deletedItem,
  setShowModal,
  deleteFC,
  response,
}: Props) {
  return (
    <div className={styles["delete-window"]}>
      <h2 className="text-[1.6rem] sm:text-[2.5rem] font-extrabold leading-[4rem]">
        This item Will be deleted permenantely , Are you sure ?
      </h2>
      <div className="flex justify-center gap-7">
        <Button
          onClick={() => deleteFC(deletedItem.id)}
          variation="danger"
          size="sm"
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
          size="sm"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}

export default DeleteWindow;

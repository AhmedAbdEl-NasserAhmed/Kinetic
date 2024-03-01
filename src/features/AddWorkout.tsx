import { HiOutlinePlusCircle } from "react-icons/hi2";
import CreateWorkout from "../components/Forms/CreateWorkout/CreateWorkout";
import Button from "../ui/Button/Button";
import Modal from "../ui/Modal/Modal";

function AddWorkout() {
  return (
    <div>
      <Modal>
        <Modal.Open opens="create-workout">
          <Button variation="primary" size="xl">
            <HiOutlinePlusCircle />
          </Button>
        </Modal.Open>
        <Modal.Window name="create-workout">
          <CreateWorkout />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddWorkout;

import { useState } from "react";

import SubNav from "../../ui/SubNav/SubNav";
import AddWorkout from "../../components/Forms/AddWorkout/AddWorkout";
import Modal from "../../ui/Modal/Modal";
import WorkoutsDashboard from "../../components/WorkoutsDashboard/WorkoutsDashboard";
import Button from "../../ui/Button/Button";
import { HiOutlinePlusCircle } from "react-icons/hi";

function WorkoutsPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <SubNav header="Workouts" paragraph="Create Your" />

      <WorkoutsDashboard showModal={showModal} />

      <Button variation="main" size="xl" onClick={() => setShowModal(true)}>
        <HiOutlinePlusCircle />
      </Button>

      {showModal && (
        <Modal handleShowModal={setShowModal}>
          <AddWorkout setShowModal={setShowModal} />
        </Modal>
      )}
    </div>
  );
}

export default WorkoutsPage;

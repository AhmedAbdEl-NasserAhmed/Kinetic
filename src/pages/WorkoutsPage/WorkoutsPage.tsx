import { useState } from "react";
import WorkoutsDashboard from "../../components/WorkoutsDashboard/WorkoutsDashboard";
import AddWorkout from "../../features/AddWorkout";
import SubNav from "../../ui/SubNav/SubNav";

function WorkoutsPage() {
  const today = new Date(Date.now()).toDateString();

  const [currentDateIndex, setCurrentDateIndex] = useState<string>();

  return (
    <div>
      <SubNav header="Workouts" paragraph="Create Your" />

      <WorkoutsDashboard
        today={today}
        setCurrentDateIndex={setCurrentDateIndex}
        currentDateIndex={currentDateIndex}
      />

      {today === currentDateIndex && <AddWorkout />}
    </div>
  );
}

export default WorkoutsPage;

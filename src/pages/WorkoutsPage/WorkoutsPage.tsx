import WorkoutsDashboard from "../../components/WorkoutsDashboard/WorkoutsDashboard";
import AddWorkout from "../../features/AddWorkout";
import SubNav from "../../ui/SubNav/SubNav";

function WorkoutsPage() {
  return (
    <div>
      <SubNav header="Workouts" paragraph="Create Your" />
      <WorkoutsDashboard />
      <AddWorkout />
    </div>
  );
}

export default WorkoutsPage;

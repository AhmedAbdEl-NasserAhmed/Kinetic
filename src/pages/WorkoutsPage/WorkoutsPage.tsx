import WorkoutsDashboard from "../../components/WorkoutsDashboard/WorkoutsDashboard";
import SubNav from "../../ui/SubNav/SubNav";

function WorkoutsPage() {
  return (
    <div>
      <SubNav header="Workouts" paragraph="Create Your" />
      <WorkoutsDashboard />
    </div>
  );
}

export default WorkoutsPage;

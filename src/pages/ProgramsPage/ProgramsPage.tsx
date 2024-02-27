import ProgramsList from "../../components/ProgramsList/ProgramsList";
import SubNav from "../../ui/SubNav/SubNav";

function WorkoutsPage() {
  return (
    <div>
      <SubNav header="Program" paragraph="Select your" />
      <ProgramsList />
    </div>
  );
}

export default WorkoutsPage;

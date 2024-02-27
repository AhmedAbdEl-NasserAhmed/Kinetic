import SubNav from "../../ui/SubNav/SubNav";
import ProgramsDaysList from "../../components/ProgramsDaysList/ProgramsDaysList";

function ProgramDays() {
  return (
    <div>
      <SubNav paragraph="Programs" header="Days" />
      <ProgramsDaysList />
    </div>
  );
}

export default ProgramDays;

import styles from "./ProgramsDaysList.module.scss";
import { useFetchProgramsQuery } from "../../services/programsApi";
import { useParams } from "react-router-dom";
import Container from "../../ui/Container/Container";
import Spinner from "../../ui/Spinner/Spinner";
import ProgramDaysItem from "./ProgramsDaysItem/ProgramDaysItem";

interface Day {
  id: number;
  name: string;
}

function ProgramsDaysList() {
  const { id } = useParams();

  const { data, isLoading } = useFetchProgramsQuery("programs");

  const selectedProgramDays = data?.find((program) => program.id === id)?.days;

  if (isLoading)
    return <Spinner borderColor="bg-blue-800" width="46" height="46" />;

  if (!selectedProgramDays)
    return (
      <p className=" flex justify-center text-4xl p-[5rem] font-semibold w-[100rem] m-auto">
        Sorry there is no a program , Go back and choose a valid one !
      </p>
    );

  return (
    <div className={styles["programs-days"]}>
      <Container>
        <div className={styles["programs-days__container"]}>
          {selectedProgramDays.map((day: Day) => (
            <ProgramDaysItem key={day.id} day={day} />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default ProgramsDaysList;

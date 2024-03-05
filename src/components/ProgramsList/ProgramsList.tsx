import styles from "./ProgramsList.module.scss";
import { useFetchProgramsQuery } from "../../services/programsApi";
import Container from "../../ui/Container/Container";
import Spinner from "../../ui/Spinner/Spinner";
import ProgramItem from "./ProgramItem/ProgramItem";

function ProgramsList() {
  const { data, isLoading } = useFetchProgramsQuery("programs");

  if (isLoading)
    return <Spinner borderColor="#1e40af" width="46" height="46" margin="15" />;

  return (
    <div className={styles.programs}>
      <Container>
        <div className={styles["programs__container"]}>
          {data?.map((program) => (
            <ProgramItem key={program.id} program={program} />
          ))}
        </div>
      </Container>
    </div>
  );
}

export default ProgramsList;

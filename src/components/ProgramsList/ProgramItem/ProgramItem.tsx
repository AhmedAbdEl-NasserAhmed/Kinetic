import { Link } from "react-router-dom";
import styles from "./ProgramItem.module.scss";

interface Props {
  program: { id: string; name: string };
}

function ProgramItem({ program }: Props) {
  return (
    <Link to={`/programs/${program?.id}`}>
      <div className={styles["program-item"]}>
        <h1 className={styles["program-item__heading"]}>
          {program?.name?.toUpperCase()}
        </h1>
        <p>Program</p>
      </div>
    </Link>
  );
}

export default ProgramItem;

import { Link } from "react-router-dom";
import styles from "./ProgramItem.module.scss";

interface Props {
  program: { id: string; name: string };
}

function ProgramItem({ program }: Props) {
  return (
    <Link to={`/programs/${program?.id}`}>
      <li className={styles["program-item"]}>
        <h1 className={styles["program-item__heading"]}>
          {program?.name?.toUpperCase()}
        </h1>
        <p>Program</p>
      </li>
    </Link>
  );
}

export default ProgramItem;

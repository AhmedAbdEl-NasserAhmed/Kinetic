import { useNavigate } from "react-router-dom";
import styles from "./ProgramDaysItem.module.scss";

interface Props {
  day: {
    id: number;
    name: string;
  };
}

function ProgramDaysItem({ day }: Props) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`${day.name.replace(" ", "")}`, { state: day })}
      className={styles["program-day"]}
    >
      <p>Day</p>
      <h2>{day.name}</h2>
    </div>
  );
}

export default ProgramDaysItem;

import styles from "./DetailedSet.module.scss";

function DetailedSet({ set }) {
  return (
    <div className={styles["set"]}>
      <h2>{set.setsReps}</h2>
      <h4>
        <span className="font-extrabold"> {set.setsWeight}</span>{" "}
        <span className="text-sm font-semibold">{set.weightUnit}</span>
      </h4>
    </div>
  );
}

export default DetailedSet;

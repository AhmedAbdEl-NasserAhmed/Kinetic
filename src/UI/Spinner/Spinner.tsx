import styles from "./Spinner.module.scss";

function Spinner() {
  return (
    <div className="flex items-center justify-center p-[2rem]">
      <span className={styles.loader}></span>
    </div>
  );
}

export default Spinner;

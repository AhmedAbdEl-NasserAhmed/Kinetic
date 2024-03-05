import styles from "./Spinner.module.scss";

interface Props {
  width: string;
  height: string;
  borderColor: string;
  margin?: string;
}

function Spinner({ width, height, borderColor, margin }: Props) {
  return (
    <div className="flex items-center justify-center">
      <span
        style={{
          width: `${width}px`,
          height: `${height}px`,
          borderStyle: "solid",
          borderWidth: "6px",
          borderColor: borderColor,
          marginTop: `${margin}px`,
        }}
        className={styles.loader}
      ></span>
    </div>
  );
}

export default Spinner;

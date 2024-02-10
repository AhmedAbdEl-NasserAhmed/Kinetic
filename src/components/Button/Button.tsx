import styles from "./Button.module.scss";

interface Props {
  children: string;
  variation: string;
}

interface Variations {
  main: string;
}

const variations: Variations = {
  main: "bg-blue-800 ",
};

function Button({ children, variation }: Props) {
  return (
    <button
      className={`${styles["btn"]} ${
        variations[variation as keyof Variations]
      }`}
    >
      {children}
    </button>
  );
}

export default Button;

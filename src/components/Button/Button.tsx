import styles from "./Button.module.scss";

interface Props {
  children: string;
  variation: string;
  onClick?: () => void;
  value?: string;
}

interface Variations {
  main: string;
  secondary: string;
}

const variations: Variations = {
  main: " p-[1.2rem] text-[1.5rem] ",
  secondary: "p-[1rem] text-[1.2rem] ",
};

function Button({ children, variation, onClick, value }: Props) {
  return (
    <button
      value={value}
      onClick={onClick}
      className={`${styles["btn"]} ${
        variations[variation as keyof Variations]
      }`}
    >
      {children}
    </button>
  );
}

export default Button;

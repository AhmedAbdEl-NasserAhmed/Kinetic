import styles from "./Button.module.scss";

interface Props {
  children: React.ReactNode;
  variation: string;
  size: string;
  disabled?: boolean;
  onClick?: () => void;
  type?: "submit" | "reset" | "button";
  value?: string;
}

interface Variations {
  primary: string;
  secondary: string;
  danger: string;
}

const variations: Variations = {
  primary: " bg-blue-800 ",
  secondary: "bg-slate-600",
  danger: "bg-red-600",
};

function Button({
  children,
  variation,
  onClick,
  value,
  size,
  type,
  disabled,
}: Props) {
  const buttonSizes = () => {
    let buttonSize = {
      padding: " inline-block w-full  p-[1.2rem] text-[1.5rem] rounded-[5px]",
    };

    switch (size) {
      case "xl":
        buttonSize = {
          padding:
            " fixed flex items-center justify-center right-[4rem] bottom-[6rem] text-[2.8rem] sm:text-[3.5rem] text-[1.4rem] w-[5rem] sm:w-[8rem] h-[5rem] sm:h-[8rem] rounded-[50%] z-[10]",
        };
        break;

      case "md":
        buttonSize = {
          padding:
            " inline-block  w-[100%] p-[0.5rem] text-[1.3rem]  sm:p-[1.2rem] sm:text-[1.5rem] rounded-[10px]",
        };
        break;

      case "sm":
        buttonSize = {
          padding:
            " inline-block rounded-[5px] w-[100%] px-[1.2rem] py-[0.6rem] sm:py-[0.8rem] sm:px-[1.4rem] text-[1.2rem] sm:text-[1.4rem]  ",
        };
        break;
    }

    return buttonSize;
  };

  return (
    <button
      disabled={disabled}
      type={type}
      value={value}
      onClick={onClick}
      className={`${styles["btn"]} ${
        variations[variation as keyof Variations]
      }  ${buttonSizes().padding} `}
    >
      {children}
    </button>
  );
}

export default Button;

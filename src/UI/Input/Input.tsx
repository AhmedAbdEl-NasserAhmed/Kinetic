import ErrorMessage from "../ErrorMessage/ErrorMessage";
import styles from "./Input.module.scss";

import { UseFormRegister, FieldValues } from "react-hook-form";

interface Props {
  id: string;
  name: string;
  type: string;
  errors: object;
  size: string;
  onClick?: () => void;
  disabled?: boolean;
  register?: UseFormRegister<FieldValues>;
  value?: string | number;
  placeholder?: string;
  validiationInputs?: {
    required: {
      value: boolean;
      message: string;
    };
    minLength?: {
      value: number;
      message: string;
    };
    pattern?: {
      value: RegExp;
      message: string;
    };
    min?: {
      value: number;
      message: string;
    };
    validate?: (value: string) => boolean | string;
  };
}

function Input({
  id,
  name,
  type,
  placeholder,
  errors,
  validiationInputs,
  register,
  value,
  onClick,
  size,
  disabled,
}: Props) {
  const widthHandler = (_size) => `min(100%,${_size})`;

  const getInputStyles = () => {
    let inputStyles = {
      width: widthHandler(size || "100%"),
    };

    switch (size) {
      case "lg":
        inputStyles = {
          width: widthHandler("80rem"),
        };
        break;

      case "md":
        inputStyles = {
          width: widthHandler("15rem"),
        };
        break;

      default:
        return inputStyles;
    }

    return inputStyles;
  };

  return (
    <div className="flex flex-col gap-5">
      <input
        onClick={onClick}
        name={name}
        id={id}
        value={value}
        style={{ width: getInputStyles().width }}
        className={`${styles["input"]}`}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        {...register(name, validiationInputs)}
      />
      {errors[name] && <ErrorMessage message={errors[name]?.message} />}
    </div>
  );
}

export default Input;

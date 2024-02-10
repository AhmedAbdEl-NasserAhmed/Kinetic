import ErrorMessage from "../ErrorMessage/ErrorMessage";
import styles from "./Input.module.scss";

import { UseFormRegister, FieldValues } from "react-hook-form";

interface Props {
  id: string;
  name: string;
  type: string;
  placeholder: string;
  register: UseFormRegister<FieldValues>;
  errors: object;
  validiationInputs: {
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
  register,
  errors,
  validiationInputs,
}: Props) {
  return (
    <>
      <input
        id={id}
        className={styles["input"]}
        type={type}
        placeholder={placeholder}
        {...register(name, validiationInputs)}
      />
      {errors[name] && <ErrorMessage message={errors[name]?.message} />}
    </>
  );
}

export default Input;

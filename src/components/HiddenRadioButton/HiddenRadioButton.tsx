import styles from "./HiddenRadioButton.module.scss";
import { UseFormRegister, FieldValues } from "react-hook-form";

interface Props {
  name: string;
  id: string;
  value: string;
  label: string;
  register: UseFormRegister<FieldValues>;
  className: boolean;
  validiationInputs?: {
    required: {
      value: boolean;
      message: string;
    };
  };
}

function HiddenRadioButton({
  id,
  name,
  value,
  label,
  register,
  validiationInputs,
  className,
}: Props) {
  return (
    <div>
      <label
        className={`${styles["hidden-radio-button"]} ${
          className ? "text-white" : ""
        } `}
        htmlFor={id}
      >
        {label}
        <input
          className="hidden"
          {...register(name, validiationInputs)}
          name={name}
          id={id}
          type="radio"
          value={value}
        />
        <span className={className ? "full-width" : ""}>&nbsp;</span>
      </label>
    </div>
  );
}

export default HiddenRadioButton;

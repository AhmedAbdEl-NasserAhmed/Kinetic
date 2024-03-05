import styles from "./HiddenRadioButton.module.scss";

interface InputProps {
  label: string;
  className: boolean;
  name?: string;
  id?: string;
  value?: string;
  register?: object;
}

function HiddenRadioButton({
  id,
  name,
  value,
  label,
  register,
  className,
}: InputProps) {
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
          {...register}
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

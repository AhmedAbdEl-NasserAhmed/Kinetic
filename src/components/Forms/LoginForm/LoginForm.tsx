import styles from "./LoginForm.module.scss";
import Input from "../../../UI/Input/Input";
import Button from "../../Button/Button";
import { useForm } from "react-hook-form";

interface Props {
  handleSwitchForms: (boolean: boolean) => void;
}

function LoginForm({ ...props }: Props) {
  const {
    watch,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const formData = watch();

  console.log(formData);

  console.log(errors);

  return (
    <form className={styles["form"]}>
      <h2 className="font-bold text-6xl">Login</h2>
      <div className={styles["form__inputs-container"]}>
        <Input
          name="loginEmail"
          id="loginEmail"
          register={register}
          type="text"
          placeholder="E-mail address"
          errors={errors}
          validiationInputs={{
            required: {
              value: true,
              message: "This Field is required",
            },
          }}
        />
        <Input
          name="loginPassword"
          id="loginPassword"
          register={register}
          type="password"
          placeholder="Enter your password"
          errors={errors}
          validiationInputs={{
            required: {
              value: true,
              message: "This Field is required",
            },
          }}
        />
      </div>
      <div className="flex flex-col items-center gap-4">
        <Button variation="main">Login</Button>
        <span
          className="text-2xl mt-4 cursor-pointer"
          onClick={() => props.handleSwitchForms(true)}
        >
          Create a new account ?
        </span>
      </div>
    </form>
  );
}

export default LoginForm;

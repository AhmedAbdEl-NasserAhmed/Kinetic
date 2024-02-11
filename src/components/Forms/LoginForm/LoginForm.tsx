import styles from "./LoginForm.module.scss";
import Input from "../../../ui/Input/Input";
import Button from "../../Button/Button";
import { useForm } from "react-hook-form";
import { signinUser } from "../../../store/authSlice/authSlice";
import { useAppDispatch } from "../../../hooks.ts/hooks";

interface Props {
  handleSwitchForms: (boolean: boolean) => void;
}

function LoginForm({ ...props }: Props) {
  const dispatch = useAppDispatch();

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const formData = watch();

  function hanldeSubmit() {
    dispatch(signinUser(formData.loginEmail, formData.loginPassword));
  }

  return (
    <form onSubmit={handleSubmit(hanldeSubmit)} className={styles["form"]}>
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

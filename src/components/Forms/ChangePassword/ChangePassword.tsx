import { useForm } from "react-hook-form";
import Input from "../../../ui/Input/Input";
import { passwordPattern } from "../../../utils/userTypes";
import Button from "../../Button/Button";
import styles from "./ChangePassword.module.scss";
import { userChangePassword } from "../../../store/authSlice/authSlice";
import { useAppDispatch } from "../../../hooks.ts/hooks";

function ChangePassword() {
  const dispatch = useAppDispatch();

  const {
    handleSubmit,
    getValues,
    register,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const formData = watch();

  function onSubmit() {
    dispatch(userChangePassword(formData.resetPassword));
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-4xl font-bold">Change Password</h2>
      <Input
        errors={errors}
        placeholder="Reset Password"
        type="password"
        id="resetPassword"
        name="resetPassword"
        register={register}
        validiationInputs={{
          required: {
            value: true,
            message: "This field is required",
          },
          pattern: {
            value: passwordPattern,
            message: "password must contains: A-z , 0-9 , @ #...",
          },
        }}
      />
      <Input
        errors={errors}
        placeholder="Confrim Password"
        type="password"
        id="reResetPassword"
        name="reResetPassword"
        register={register}
        validiationInputs={{
          required: {
            value: true,
            message: "This field is required",
          },
          validate: (value: string) =>
            value === getValues().resetPassword || "Password does not match",
        }}
      />
      <Button value="submit" variation="secondary">
        Reset Password
      </Button>
    </form>
  );
}

export default ChangePassword;

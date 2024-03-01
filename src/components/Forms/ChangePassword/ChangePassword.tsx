import { useForm } from "react-hook-form";
import Input from "../../../ui/Input/Input";
import { passwordPattern } from "../../../utils/userTypes";
import Button from "../../../ui/Button/Button";
import styles from "./ChangePassword.module.scss";
import { userChangePassword } from "../../../store/authSlice/authSlice";
import { useAppDispatch } from "../../../hooks/hooks";

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
        size="lg"
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
            message: "Password must contains: A-z , 0-9 , @ #...",
          },
        }}
      />
      <Input
        size="lg"
        errors={errors}
        placeholder="Confirm Password"
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
      <Button size="md" value="submit" variation="primary">
        Reset Password
      </Button>
    </form>
  );
}

export default ChangePassword;

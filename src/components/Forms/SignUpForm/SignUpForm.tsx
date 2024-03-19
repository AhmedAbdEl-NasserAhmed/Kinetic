import { useForm } from "react-hook-form";
import { emailPattern, passwordPattern } from "../../../utils/userTypes.js";
import Button from "../../../ui/Button/Button.js";
import Input from "../../../ui/Input/Input";
import { signupUser } from "../../../store/authSlice/authSlice.js";
import { useAppDispatch } from "../../../hooks/hooks.js";

interface Props {
  handleSwitchForms: (boolean: boolean) => void;
}

function SignUpForm({ ...props }: Props) {
  const {
    watch,
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const dispatch = useAppDispatch();

  const formData = watch();

  function onSubmit() {
    dispatch(
      signupUser(
        formData.signupEmail,
        formData.signupPassword,
        formData.username
      )
    );

    if (!errors) props.handleSwitchForms(false);
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-center gap-[2.2rem]"
    >
      <h2 className="font-bold text-6xl">Signup</h2>

      <div className="flex flex-col gap-[1.8rem]">
        <Input
          size="lg"
          name="username"
          id="username"
          register={register}
          type="text"
          placeholder="Username"
          errors={errors}
          validiationInputs={{
            required: {
              value: true,
              message: "This Field is required",
            },
            minLength: {
              value: 6,
              message: "Should more than 6 characters",
            },
          }}
        />
        <Input
          size="lg"
          name="signupEmail"
          id="signupEmail"
          register={register}
          type="text"
          placeholder="Email"
          errors={errors}
          validiationInputs={{
            required: {
              value: true,
              message: "This Field is required",
            },
            pattern: {
              value: emailPattern,
              message: "Please enter a valid Email",
            },
          }}
        />
        <Input
          size="lg"
          name="age"
          id="age"
          register={register}
          type="number"
          placeholder="Age"
          errors={errors}
          validiationInputs={{
            required: {
              value: true,
              message: "This Field is required",
            },
            min: {
              value: 16,
              message: "Age should more than 16 years",
            },
          }}
        />

        <Input
          size="lg"
          name="signupPassword"
          id="signupPassword"
          register={register}
          type="password"
          placeholder="Password"
          errors={errors}
          validiationInputs={{
            required: {
              value: true,
              message: "This Field is required",
            },
            pattern: {
              value: passwordPattern,
              message: "Password must contains: A-z , 0-9 , @ #...",
            },
          }}
        />

        <Input
          size="lg"
          name="reSignupRePassword"
          id="reSignupRePassword"
          register={register}
          type="password"
          placeholder="Re-Password"
          errors={errors}
          validiationInputs={{
            required: {
              value: true,
              message: "Password does not match",
            },
            validate: (value: string) =>
              value === getValues().signupPassword || "Password does not match",
          }}
        />
      </div>

      <div className="flex flex-col items-center gap-2">
        <Button size="sm" value="submit" variation="primary">
          Singup
        </Button>
        <span
          className="text-2xl mt-4 cursor-pointer"
          onClick={() => props.handleSwitchForms(false)}
        >
          Already have an account ?
        </span>
      </div>
    </form>
  );
}

export default SignUpForm;

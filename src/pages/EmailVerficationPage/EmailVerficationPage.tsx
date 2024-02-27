import { useForm } from "react-hook-form";
import Input from "../../ui/Input/Input";
import { emailPattern } from "../../utils/userTypes";
import Button from "../../ui/Button/Button";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { emailVerfication } from "../../store/authSlice/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function EmailVerficationPage() {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { user } = useAppSelector((store) => store.authentication);

  useEffect(() => {
    if (user) navigate("/programs");
  }, [user, navigate]);

  const {
    handleSubmit,
    watch,
    register,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const formData = watch();

  function onSubmit() {
    dispatch(emailVerfication(formData.verifyEmail));
    navigate("/");
  }

  return (
    <div className="flex flex-col items-center justify-center gap-[5rem]">
      <nav className="flex justify-between items-center bg-blue-800 p-[3rem] text-white w-full ">
        <p className="font-extrabold text-5xl">KINETIC</p>
        <span
          onClick={() => navigate("/")}
          className="font-extrabold text-2xl cursor-pointer"
        >
          Go Back
        </span>
      </nav>
      <form
        className=" flex flex-col gap-[1.5rem] text-center "
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-blue-800 text-[2.4rem] mb-5 font-bold">
          Confirm Your Email
        </h2>
        <Input
          name="verifyEmail"
          id="verifyEmail"
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
        <Button size="md" value="submit" variation="main">
          Confirm Email
        </Button>
      </form>
    </div>
  );
}

export default EmailVerficationPage;

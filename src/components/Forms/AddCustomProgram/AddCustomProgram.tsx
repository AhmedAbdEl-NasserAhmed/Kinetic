import { useState } from "react";
import Button from "../../../ui/Button/Button";
import { CustomDayProgram } from "../../../interfaces/interfaces";
import styles from "./AddCustomProgram.module.scss";
import { useForm } from "react-hook-form";
import Input from "../../../ui/Input/Input";
import NewAddedProgramDay from "../../NewAddedProgramDay/NewAddedProgramDay";
import ProgramDaysDetails from "../ProgramDaysDetails/ProgramDaysDetails";
import { useAddProgramMutation } from "../../../services/programsApi";

interface Props {
  setShowModal?: () => void;
}

function AddCustomProgram({ setShowModal }: Props) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    resetField,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const [programDays, setProgramDays] = useState<CustomDayProgram[]>([]);

  const [selectedDay, setSelectedDay] = useState();

  const [showDayDetails, setShowDayDetails] = useState(false);

  const [addProgram] = useAddProgramMutation();

  const formData = watch();

  console.log("FormData", formData);

  const allDaysCompleted = programDays.every((day) => day.isCompleted);

  function onSubmit() {
    const uncompletedElement = document.getElementsByClassName("not-complete");

    Array.from(uncompletedElement).forEach((set) => {
      set.classList.add("check-sets");
    });

    if (!allDaysCompleted) return;

    addProgram({
      id: crypto.randomUUID(),
      name: formData.programName,
      days: programDays,
      isCustom: true,
    });
    setShowModal();
  }

  function addDay() {
    const programDaysNumber = document.getElementById(
      "programDaysNumber"
    )! as HTMLInputElement;

    const programDay: CustomDayProgram = {
      id: crypto.randomUUID(),
      name: "",
      isCompleted: false,
    };

    setValue("programDaysNumber", Number(programDaysNumber.value) + 1);

    setProgramDays((data) => [...data, programDay]);
  }

  function removeDay() {
    const programDaysNumber = document.getElementById(
      "programDaysNumber"
    )! as HTMLInputElement;

    setValue("programDaysNumber", Number(programDaysNumber.value) - 1);

    const lastDay = programDays[programDays.length - 1];

    setProgramDays((days) => days.filter((set) => set.id !== lastDay.id));
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles["custom-program"]}
    >
      <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-800">
        Add your Program
      </h2>

      <Input
        size="lg"
        id="programName"
        name="programName"
        type="text"
        placeholder="Program Name"
        register={register}
        errors={errors}
        validiationInputs={{
          required: {
            value: true,
            message: "This Field is required",
          },
        }}
      />

      <h2 className="text-3xl sm:text-4xl font-extrabold">Num of Days</h2>

      <div className="flex items-center gap-[5rem] ">
        <Input
          size="md"
          placeholder="NUM OF DAYS:"
          id="programDaysNumber"
          name="programDaysNumber"
          type="number"
          register={register}
          errors={errors}
          validiationInputs={{
            required: {
              value: true,
              message: "This Field is required",
            },
            min: {
              value: 1,
              message:
                "Minimun program Days Number number should be more than 1",
            },
          }}
        />
        <div className="flex items-center gap-10 ">
          <Button type="button" size="sm" variation="primary" onClick={addDay}>
            +
          </Button>
          <Button
            type="button"
            size="sm"
            variation="danger"
            onClick={removeDay}
          >
            -
          </Button>
        </div>
      </div>
      <div
        id="sets-container"
        className="flex items-center flex-wrap gap-[3rem]"
      >
        {programDays.map((programDay) => (
          <NewAddedProgramDay
            showDayDetails={showDayDetails}
            setShowDayDetails={setShowDayDetails}
            setSelectedDay={setSelectedDay}
            programDay={programDay}
            key={programDay.id}
            programDays={programDays}
          />
        ))}
      </div>

      {showDayDetails && (
        <ProgramDaysDetails
          register={register}
          errors={errors}
          setShowDayDetails={setShowDayDetails}
          selectedDay={selectedDay}
          programDays={programDays}
          formData={formData}
          resetField={resetField}
        />
      )}
      <div className="flex gap-5  mt-8">
        <Button type="submit" variation="primary" size="md">
          Add Program
        </Button>
        <Button
          onClick={setShowModal}
          type="button"
          variation="danger"
          size="md"
        >
          cancel
        </Button>
      </div>
    </form>
  );
}

export default AddCustomProgram;

import styles from "./CreateWorkout.module.scss";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { radioButtons } from "../../../constants/RadioButtons";
import Input from "../../../ui/Input/Input";
import Button from "../../../ui/Button/Button";
import HiddenRadioButton from "../../HiddenRadioButton/HiddenRadioButton";
import ErrorMessage from "../../../ui/ErrorMessage/ErrorMessage";
import SetsDetails from "../SetsDetails/SetsDetails";
import Set from "./Set/Set";
import toast from "react-hot-toast";
import { useAppSelector } from "../../../hooks/hooks";
import { useAddWorkoutProgramMutation } from "../../../services/workoutApi";
import { useParams } from "react-router-dom";
import { ISetObject, DefaultValues } from "../../../interfaces/interfaces";

interface Props {
  setShowModal?: (showModal: string) => void;
}

const defaultValues: DefaultValues = {
  workoutName: "",
  setsNumber: 0,
  targetedMuscle: "",
  setsDetailReps: "",
  setsDetailWeight: "",
};

function CreateWorkout({ setShowModal }: Props) {
  const {
    register,
    clearErrors,
    handleSubmit,
    watch,
    resetField,
    setValue,
    formState: { errors },
  } = useForm<DefaultValues>({
    mode: "onChange",
    defaultValues,
  });

  const formData = watch();

  const [sets, setSets] = useState<ISetObject[]>([]);

  const [selectedSet, setSelectedSet] = useState<ISetObject>();

  const [totalSets, setTotalSets] = useState<number>(0);

  const [weightUnit, setWeightUnit] = useState<string>("KG");

  const [showSetDetails, setShowSetDetails] = useState(false);

  const areAllSetsCompleted = sets.every((set) => set.isCompleted);

  const { user } = useAppSelector((state) => state.authentication);

  const [addWorkoutProgram] = useAddWorkoutProgramMutation();

  const { name } = useParams();

  useEffect(() => {
    if (formData.setsNumber >= 1 && formData.setsNumber > totalSets) {
      const setObject: ISetObject = {
        id: crypto.randomUUID(),
        setsWeight: "",
        setsReps: "",
        isCompleted: false,
        weightUnit: "",
      };

      setSets((sets) => [...sets, setObject]);

      setTotalSets(formData.setsNumber);

      //
    } else if (formData.setsNumber < totalSets) {
      //

      const lastElement = sets[sets.length - 1];

      setSets((set) => set.filter((set) => set.id !== lastElement.id));

      setTotalSets(formData.setsNumber--);

      //
    }
  }, [formData.setsNumber, totalSets, sets]);

  function onSubmit() {
    if (!areAllSetsCompleted) {
      toast.error("Please Fill All Sets Slots");
      return;
    }

    addWorkoutProgram({
      id: crypto.randomUUID(),
      userId: user?.uid || user?.uuid,
      sets: sets,
      workoutName: formData.workoutName,
      tragetedMuscle: formData.targetedMuscle,
      workoutTime: new Date(Date.now()).toDateString(),
      workoutCategory: name,
    });

    setShowModal("");
  }

  function addSet() {
    const setNumbersInput = document.getElementById(
      "setsNumber"
    )! as HTMLInputElement;

    setValue("setsNumber", Number(setNumbersInput.value) + 1);
    clearErrors("setsNumber");
  }

  function removeSet() {
    if (formData.setsNumber <= 0) return;
    const setNumbersInput = document.getElementById(
      "setsNumber"
    )! as HTMLInputElement;

    setValue("setsNumber", Number(setNumbersInput.value) - 1);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className="text-5xl font-extrabold">Add Workout</h2>
      <Input
        size="lg"
        id="workoutName"
        name="workoutName"
        type="text"
        placeholder="Workout Name"
        register={register}
        errors={errors}
        validiationInputs={{
          required: {
            value: true,
            message: "This Field is required",
          },
        }}
      />
      <div className="flex flex-col gap-7">
        <h2 className="text-4xl font-extrabold mb-5">TARGETED MUSCLE:</h2>
        <div className="flex gap-[3rem] items-center flex-wrap ">
          {radioButtons.map((button) => (
            <HiddenRadioButton
              className={button.id === formData.targetedMuscle}
              key={button.id}
              label={button.label}
              name={button.name}
              id={button.id}
              value={button.value}
              register={register}
              validiationInputs={{
                required: {
                  value: true,
                  message: "",
                },
              }}
            />
          ))}
        </div>
        {errors.targetedMuscle && (
          <ErrorMessage message="This Field is required" />
        )}
      </div>
      <h2 className="text-4xl font-extrabold">Number of Sets :</h2>

      <div className="flex items-center gap-[5rem] ">
        <Input
          size="md"
          placeholder="NUM OF SETS:"
          id="setsNumber"
          name="setsNumber"
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
              message: "Minimun sets number should be more than 1",
            },
          }}
        />
        <div className="flex items-center gap-10">
          <Button type="button" size="sm" variation="primary" onClick={addSet}>
            +
          </Button>
          <Button
            type="button"
            size="sm"
            variation="danger"
            onClick={removeSet}
          >
            -
          </Button>
        </div>
      </div>
      <div className="flex items-center flex-wrap gap-[3rem]">
        {sets.map((set) => (
          <Set
            key={set.id}
            setSelectedSet={setSelectedSet}
            handleShowSetDetailsModal={setShowSetDetails}
            showSetDetailsModal={showSetDetails}
            set={set}
            sets={sets}
          />
        ))}
      </div>

      {showSetDetails && (
        <SetsDetails
          resetField={resetField}
          handleShowSetDetailsModal={setShowSetDetails}
          errors={errors}
          register={register}
          sets={sets}
          selectedSet={selectedSet}
          formData={formData}
          weightUnit={weightUnit}
          setWeightUnit={setWeightUnit}
        />
      )}

      <Button variation="primary" size="lg">
        Add Workout
      </Button>
    </form>
  );
}

export default CreateWorkout;

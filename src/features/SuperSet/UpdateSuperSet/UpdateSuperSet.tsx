import { useState } from "react";
import { useUpdateWorkoutMutation } from "../../../services/workoutApi";
import Button from "../../../ui/Button/Button";
import Input from "../../../ui/Input/Input";
import { useForm } from "react-hook-form";
import { ISetObject, WorkoutObject } from "../../../interfaces/interfaces";
import { radioButtons } from "../../../constants/RadioButtons";
import HiddenRadioButton from "../../../components/HiddenRadioButton/HiddenRadioButton";
import ErrorMessage from "../../../ui/ErrorMessage/ErrorMessage";
import NewAddedSet from "../../../components/NewAddedSet/NewAddedSet";
import SetsDetails from "../../../components/Forms/SetsDetails/SetsDetails";
import styles from "./UpdateSuperSet.module.scss";
import SuperSetUpdateDetails from "./SuperSetUpdateDetails/SuperSetUpdateDetails";

interface UpdateDropSetDefaultValues {
  workoutName?: string;
  targetedMuscle?: string;
  setsNumber?: number;
  superSetName?: string;
  superSetsNumber?: number;
}

interface props {
  workout: WorkoutObject;
  setShowModal?: () => void;
}

function UpdateSuperSet({ workout, setShowModal }: props) {
  console.log("workout", workout);

  const {
    setValue,
    resetField,
    clearErrors,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UpdateDropSetDefaultValues>({
    defaultValues: {
      workoutName: workout.workoutName,
      targetedMuscle: workout.tragetedMuscle,
      setsNumber: workout.sets.length,
      superSetsNumber: workout.superSets.length,
      superSetName: workout.superSetName,
    },
  });

  const formData = watch();

  const [updateSets, setUpdateSets] = useState(workout.sets);

  const [updateSuperSets, setUpdateSuperSets] = useState(workout.superSets);

  const [updatedSelectedSet, setUpdatedSelectedSet] = useState();

  const [selectedUpdatedSuperSet, setSelectedUpdatedSuperset] = useState();

  const [showSetDetails, setShowSetDetails] = useState(false);

  const [updateWorkout] = useUpdateWorkoutMutation();

  const areAllSetsCompleted = updateSets.every((set) => set.isCompleted);

  const areAllSuperSetsCompleted = updateSuperSets.every(
    (set) => set.isCompleted
  );

  function addSet() {
    const setNumbersInput = document.getElementById(
      "setsNumber"
    )! as HTMLInputElement;

    const setObject: ISetObject = {
      id: crypto.randomUUID(),
      setsWeight: "",
      setsReps: "",
      isCompleted: false,
      weightUnit: "",
    };

    setUpdateSets((data) => [...data, setObject]);

    const superSetObject: ISetObject = {
      id: crypto.randomUUID(),
      setsWeight: "",
      setsReps: "",
      isCompleted: false,
      weightUnit: "",
    };

    setUpdateSuperSets((superSets) => [...superSets, superSetObject]);

    setValue("setsNumber", Number(setNumbersInput.value) + 1);

    clearErrors("setsNumber");
  }

  function removeSet() {
    if (formData.setsNumber <= 1) return;

    const setNumbersInput = document.getElementById(
      "setsNumber"
    )! as HTMLInputElement;

    const lastElement = updateSets[updateSets.length - 1];

    setUpdateSets((set) => set.filter((set) => set.id !== lastElement.id));

    const lastSuperElement = updateSuperSets[updateSuperSets.length - 1];

    setUpdateSuperSets((set) =>
      set.filter((set) => set.id !== lastSuperElement.id)
    );

    setValue("setsNumber", Number(setNumbersInput.value) - 1);
  }

  function onSubmit() {
    const uncompletedElement = document.getElementsByClassName("not-complete");

    Array.from(uncompletedElement).forEach((set) => {
      set.classList.add("check-sets");
    });

    if (!areAllSetsCompleted || !areAllSuperSetsCompleted) return;

    updateWorkout({
      id: workout.id,
      data: {
        workoutName: formData.workoutName,
        tragetedMuscle: formData.targetedMuscle,
        sets: updateSets,
        superSets: updateSuperSets,
        superSetName: formData.superSetName,
      },
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles["update-superSet"]} id="create-workout">
        <h2 className="text-4xl font-extrabold">Update Workout</h2>
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
          <h2 className="text-3xl font-extrabold mb-5">TARGETED MUSCLE:</h2>
          <div className="flex gap-[3rem] items-center flex-wrap ">
            {radioButtons.map((button) => (
              <HiddenRadioButton
                className={button.id === formData.targetedMuscle}
                key={button.id}
                label={button.label}
                name={button.name}
                id={button.id}
                value={button.value}
                register={{
                  ...register("targetedMuscle"),
                }}
              />
            ))}
          </div>
          {errors.targetedMuscle && (
            <ErrorMessage message="This Field is required" />
          )}
        </div>
        <h2 className="text-3xl font-extrabold">Number of Sets :</h2>

        <div className="flex items-center gap-[5rem] ">
          <Input
            size="md"
            placeholder="NUM OF SETS:"
            id="setsNumber"
            name="setsNumber"
            type="number"
            register={register}
            errors={errors}
          />

          <div className="flex items-center gap-10 ">
            <Button
              onClick={addSet}
              type="button"
              size="sm"
              variation="primary"
            >
              +
            </Button>
            <Button
              onClick={removeSet}
              type="button"
              size="sm"
              variation="danger"
            >
              -
            </Button>
          </div>
        </div>

        <div
          id="sets-container"
          className="flex items-center flex-wrap gap-[3rem]"
        >
          {updateSets.map((set) => (
            <NewAddedSet
              showSetDetailsModal={showSetDetails}
              handleShowSetDetailsModal={setShowSetDetails}
              setSelectedSet={setUpdatedSelectedSet}
              key={set.id}
              set={set}
              sets={updateSets}
            />
          ))}
        </div>

        {showSetDetails && (
          <SetsDetails
            setArraySets={setUpdateSets}
            resetField={resetField}
            handleShowSetDetailsModal={setShowSetDetails}
            errors={errors}
            register={register}
            sets={updateSets}
            selectedSet={updatedSelectedSet}
            formData={formData}
          />
        )}
        <SuperSetUpdateDetails
          resetField={resetField}
          updatedSuperSets={updateSuperSets}
          errors={errors}
          formData={formData}
          register={register}
          setSelectedUpdatedSuperSet={setSelectedUpdatedSuperset}
          selectedUpdatedSuperSet={selectedUpdatedSuperSet}
          setUpdateSuperSets={setUpdateSuperSets}
        />

        <hr />
        <div className="flex gap-5 ">
          <Button type="submit" variation="primary" size="md">
            Update Workout
          </Button>
          <Button
            type="button"
            onClick={setShowModal}
            variation="danger"
            size="md"
          >
            cancel
          </Button>
        </div>
      </div>
    </form>
  );
}

export default UpdateSuperSet;

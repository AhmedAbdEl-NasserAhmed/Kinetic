import { useForm } from "react-hook-form";
import Input from "../../../ui/Input/Input";
import { radioButtons } from "../../../constants/RadioButtons";
import HiddenRadioButton from "../../../components/HiddenRadioButton/HiddenRadioButton";
import ErrorMessage from "../../../ui/ErrorMessage/ErrorMessage";
import Button from "../../../ui/Button/Button";
import {
  ISetObject,
  UpdateBasicWorkoutDefaultValues,
  WorkoutObject,
} from "../../../interfaces/interfaces";
import NewAddedSet from "../../../components/NewAddedSet/NewAddedSet";
import { useState } from "react";
import SetsDetails from "../../../components/Forms/SetsDetails/SetsDetails";
import styles from "./UpdateBasicWorkoutItem.module.scss";
import { useUpdateWorkoutMutation } from "../../../services/workoutApi";

interface Props {
  workout: WorkoutObject;
  setShowModal?: () => void;
}

function UpdateBasicWorkoutItem({ workout, setShowModal }: Props) {
  const {
    setValue,
    resetField,
    clearErrors,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<UpdateBasicWorkoutDefaultValues>({
    defaultValues: {
      workoutName: workout.workoutName,
      targetedMuscle: workout.tragetedMuscle,
      setsNumber: workout.sets.length,
    },
  });

  const formData = watch();

  const [updateSets, setUpdateSets] = useState(workout.sets);

  const [updatedSelectedSet, setUpdatedSelectedSet] = useState();

  const [showSetDetails, setShowSetDetails] = useState(false);

  const [updateWorkout] = useUpdateWorkoutMutation();

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

    setValue("setsNumber", Number(setNumbersInput.value) - 1);
  }

  function onSubmit() {
    updateWorkout({
      id: workout.id,
      data: {
        workoutName: formData.workoutName,
        tragetedMuscle: formData.targetedMuscle,
        sets: updateSets,
      },
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles["update-basicWorkout"]} id="create-workout">
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
                  ...register("targetedMuscle", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  }),
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

        <hr />
        <div className="flex gap-5 ">
          <Button type="submit" variation="primary" size="md">
            update Workout
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

export default UpdateBasicWorkoutItem;

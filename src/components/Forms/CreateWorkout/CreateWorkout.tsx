import styles from "./CreateWorkout.module.scss";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { radioButtons } from "../../../constants/RadioButtons";
import Input from "../../../ui/Input/Input";
import Button from "../../../ui/Button/Button";
import HiddenRadioButton from "../../HiddenRadioButton/HiddenRadioButton";
import ErrorMessage from "../../../ui/ErrorMessage/ErrorMessage";
import SetsDetails from "../SetsDetails/SetsDetails";
import { useAppSelector } from "../../../hooks/hooks";
import { useAddWorkoutProgramMutation } from "../../../services/workoutApi";
import { useParams } from "react-router-dom";
import { ISetObject, DefaultValues } from "../../../interfaces/interfaces";
import NewAddedSet from "./Set/NewAddedSet/NewAddedSet";
import { FaFireFlameCurved, FaFireFlameSimple } from "react-icons/fa6";
import PillShape from "../../../ui/PillShape/PillShape";
import SuperSet from "../../../features/SuperSet/SuperSet";
import DropSet from "../../../features/DropSet/DropSet";
import { getScroll } from "../../../helpers/getScroll";

interface Props {
  setShowModal?: () => void;
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
    unregister,
    register,
    clearErrors,
    handleSubmit,
    watch,
    resetField,
    setValue,
    formState: { errors },
  } = useForm<DefaultValues>({
    defaultValues,
    mode: "onChange",
  });

  const formData = watch();

  const [sets, setSets] = useState<ISetObject[]>([]);

  const [superSets, setSuperSets] = useState<ISetObject[]>([]);

  const [dropSets, setDropSets] = useState<ISetObject[]>([]);

  const [selectedSet, setSelectedSet] = useState<ISetObject>();

  const [selectedSuperSet, setSelectedSuperSet] = useState<ISetObject>();

  const [selectedDropSet, setSelectedDropSet] = useState<ISetObject>();

  const [weightUnit, setWeightUnit] = useState<string>("KG");

  const [showSetDetails, setShowSetDetails] = useState(false);

  const [showSuperSetForm, setShowSuperSetForm] = useState<boolean>(false);

  const [showDropSetForm, setShowDropSetForm] = useState<boolean>(false);

  const [toggleSets, setToggleSets] = useState("");

  const areAllSetsCompleted = sets.every((set) => set.isCompleted);

  const areAllSuperSetsCompleted = superSets.every((set) => set.isCompleted);

  const { user } = useAppSelector((state) => state.authentication);

  const [addWorkoutProgram] = useAddWorkoutProgramMutation();

  const { name } = useParams();

  function onSubmit() {
    const uncompletedElement = document.getElementsByClassName("not-complete");

    Array.from(uncompletedElement).forEach((set) => {
      set.classList.add("check-sets");
    });

    if (!areAllSetsCompleted || (!areAllSuperSetsCompleted && showSuperSetForm))
      return;

    if (formData.superSet) {
      addWorkoutProgram({
        id: crypto.randomUUID(),
        userId: user?.uid || user?.uuid,
        sets,
        workoutName: formData.workoutName,
        tragetedMuscle: formData.targetedMuscle,
        superSetName: formData.superSet.superSetName,
        superSets,
        workoutTime: new Date(Date.now()).toDateString(),
        workoutCategory: name,
        workoutType: "superSet",
      });
    }

    if (formData.dropSet) {
      addWorkoutProgram({
        id: crypto.randomUUID(),
        userId: user?.uid || user?.uuid,
        sets,
        workoutName: formData.workoutName,
        tragetedMuscle: formData.targetedMuscle,
        dropSets,
        workoutTime: new Date(Date.now()).toDateString(),
        workoutCategory: name,
        workoutType: "dropSet",
      });
    }

    if (!formData.superSet && !formData.dropSet) {
      addWorkoutProgram({
        id: crypto.randomUUID(),
        userId: user?.uid || user?.uuid,
        sets: sets,
        workoutName: formData.workoutName,
        tragetedMuscle: formData.targetedMuscle,
        workoutTime: new Date(Date.now()).toDateString(),
        workoutCategory: name,
        workoutType: "basic",
      });
    }
    setShowModal();
  }

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

    setSets((sets) => [...sets, setObject]);

    const superSetObject: ISetObject = {
      id: crypto.randomUUID(),
      setsWeight: "",
      setsReps: "",
      isCompleted: false,
      weightUnit: "",
    };

    setSuperSets((superSets) => [...superSets, superSetObject]);

    setValue("setsNumber", Number(setNumbersInput.value) + 1);
    clearErrors("setsNumber");
  }

  function removeSet() {
    if (formData.setsNumber <= 0) return;
    const setNumbersInput = document.getElementById(
      "setsNumber"
    )! as HTMLInputElement;

    const lastElement = sets[sets.length - 1];

    setSets((set) => set.filter((set) => set.id !== lastElement.id));

    const lastSuperElement = superSets[superSets.length - 1];

    setSuperSets((set) => set.filter((set) => set.id !== lastSuperElement.id));

    setValue("setsNumber", Number(setNumbersInput.value) - 1);
  }

  // console.log("FormData", formData);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles["form__container"]}>
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
          <div className="flex items-center gap-10 ">
            <Button
              type="button"
              size="sm"
              variation="primary"
              onClick={addSet}
            >
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

        <div
          id="sets-container"
          className="flex items-center flex-wrap gap-[3rem]"
        >
          {sets.map((set) => (
            <NewAddedSet
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

        <hr />

        {!showSuperSetForm && !showDropSetForm && (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[3rem]">
              <PillShape
                onClick={() => {
                  getScroll("super-set");
                  setShowSuperSetForm(true);
                  setToggleSets("superSet");
                }}
                leftSideDesign="bg-blue-800 p-4 text-white self-stretch "
                RightSideDesign="bg-slate-200 p-4 text-slate-800 font-bold "
                leftSideContent={<FaFireFlameCurved />}
                RightSideContent="Super Set"
              />
              <PillShape
                onClick={() => {
                  getScroll("drop-set");
                  setShowDropSetForm(true);
                  setToggleSets("dropSet");
                }}
                leftSideDesign="bg-blue-800 p-4 text-white self-stretch"
                RightSideDesign="bg-slate-200 p-4 text-slate-800 font-bold "
                leftSideContent={<FaFireFlameSimple />}
                RightSideContent="Drop Set"
              />
            </div>
            <div className="flex gap-5 basis-[30rem]">
              <Button type="submit" variation="primary" size="md">
                Add Workout
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
        )}
      </div>

      {showSuperSetForm && (
        <SuperSet
          setToggleSets={setToggleSets}
          toggleSets={toggleSets}
          setShowSuperSetForm={setShowSuperSetForm}
          resetField={resetField}
          weightUnit={weightUnit}
          setWeightUnit={setWeightUnit}
          selectedSuperSet={selectedSuperSet}
          superSets={superSets}
          setSelectedSuperSet={setSelectedSuperSet}
          register={register}
          formData={formData}
          setShowModal={setShowModal}
          errors={errors}
          unregister={unregister}
          setShowDropSetForm={setShowDropSetForm}
        />
      )}

      {showDropSetForm && (
        <DropSet
          setToggleSets={setToggleSets}
          setShowSuperSetForm={setShowSuperSetForm}
          toggleSets={toggleSets}
          setValue={setValue}
          clearErrors={clearErrors}
          setShowDropSetForm={setShowDropSetForm}
          resetField={resetField}
          weightUnit={weightUnit}
          setWeightUnit={setWeightUnit}
          selectedDropSet={selectedDropSet}
          dropSets={dropSets}
          setSelectedDropSet={setSelectedDropSet}
          register={register}
          formData={formData}
          setShowModal={setShowModal}
          errors={errors}
          unregister={unregister}
          setDropSets={setDropSets}
        />
      )}
    </form>
  );
}

export default CreateWorkout;

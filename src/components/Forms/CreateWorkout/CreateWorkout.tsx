import styles from "./CreateWorkout.module.scss";
import { useEffect, useState } from "react";
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
import {
  ISetObject,
  DefaultValues,
  WorkoutObject,
} from "../../../interfaces/interfaces";
import NewAddedSet from "../../NewAddedSet/NewAddedSet";
import { FaFireFlameCurved, FaFireFlameSimple } from "react-icons/fa6";
import PillShape from "../../../ui/PillShape/PillShape";
import SuperSet from "../../../features/SuperSet/SuperSet";
import DropSet from "../../../features/DropSet/DropSet";
import { getScroll } from "../../../helpers/getScroll";
import { restTimeTimer } from "../../../helpers/restTimeTimer";
import RestTimeOptions from "../../RestTimeOptions/RestTimeOptions";
import { HiBackward, HiClock, HiPlay } from "react-icons/hi2";
import { HiOutlineRefresh } from "react-icons/hi";
import DropDownWorkoutsList from "../../DropDownWorkoutsList/DropDownWorkoutsList";
import LastWorkoutDetails from "../../LastWorkoutDetails/LastWorkoutDetails";
import useSetLastWorkout from "../../../hooks/useSetLastWorkout";

interface Props {
  setShowModal?: () => void;
}

const defaultValues: DefaultValues = {
  workoutName: "",
  setsNumber: 0,
  targetedMuscle: "",
  setsDetailReps: "",
  setsDetailWeight: "",
  restTime: "60",
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

  const [showSetDetails, setShowSetDetails] = useState(false);

  const [showSuperSetForm, setShowSuperSetForm] = useState<boolean>(false);

  const [showDropSetForm, setShowDropSetForm] = useState<boolean>(false);

  const [toggleSets, setToggleSets] = useState("");

  const [showRestMenu, setShowResetMenu] = useState(false);

  const [timer, setTimer] = useState<string>("00:00");

  const [timerInterval, setTimerInterval] = useState();

  const [showPrevoisWorkouts, setShowPreviousWorkouts] =
    useState<boolean>(false);

  const [comparableWorkoutName, setComparableWorkoutName] = useState("");

  const [showLastWorkOutDetails, setShowWorkoutDetails] = useState(false);

  const [lastWorkout, setLastWorkout] = useState<WorkoutObject>();

  const areAllSetsCompleted = sets.every((set) => set.isCompleted);

  const areAllSuperSetsCompleted = superSets.every((set) => set.isCompleted);

  const { user } = useAppSelector((state) => state.authentication);

  const [addWorkoutProgram, response] = useAddWorkoutProgramMutation();

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

    if (formData.dropSetsNumber) {
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

    if (!formData.superSet && !formData.dropSetsNumber) {
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

  useEffect(() => {
    if (comparableWorkoutName !== "") {
      setValue("workoutName", comparableWorkoutName);
      setValue("targetedMuscle", lastWorkout?.tragetedMuscle);
    } else {
      unregister("targetedMuscle");
    }
  }, [
    comparableWorkoutName,
    setValue,
    lastWorkout?.tragetedMuscle,
    unregister,
  ]);

  useEffect(() => {
    const workoutContainer = document.getElementById(
      "create-workout"
    )! as HTMLFormElement;

    if (!workoutContainer) return;

    setTimeout(() => {
      workoutContainer.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }, 1000);
  }, []);

  useSetLastWorkout(comparableWorkoutName, setLastWorkout);

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div id="create-workout" className={styles["form__container"]}>
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-[1.5rem] ">
            {
              <span
                onClick={() => setShowWorkoutDetails(true)}
                className={`text-6xl text-blue-500 cursor-pointer ${
                  comparableWorkoutName !== "" ? "block" : "hidden"
                }`}
              >
                <HiBackward />
              </span>
            }
            {showLastWorkOutDetails && (
              <LastWorkoutDetails
                lastWorkout={lastWorkout}
                setShowWorkoutDetails={setShowWorkoutDetails}
              />
            )}
            <h2 className="text-3xl sm:text-5xl font-extrabold self-end">
              Add Workout
            </h2>
          </div>

          <div className="flex flex-col items-center gap-3 sm:gap-5 ">
            <h2 className="text-2xl sm:text-4xl text-blue-800 font-extrabold">
              {timer}
            </h2>
            <div className="flex items-center gap-5 sm:gap-12 ">
              <Button
                disabled={timer !== "00:00" ? true : false}
                type="button"
                onClick={() =>
                  restTimeTimer(setTimer, formData.restTime, setTimerInterval)
                }
                variation="primary"
                size="sm"
              >
                <HiPlay />
              </Button>
              <Button
                type="button"
                onClick={() => setShowResetMenu(true)}
                variation="primary"
                size="sm"
              >
                <HiClock />
              </Button>
              <Button
                type="button"
                onClick={() => {
                  setTimer("00:00");
                  clearInterval(timerInterval);
                }}
                variation="danger"
                size="sm"
              >
                <HiOutlineRefresh />
              </Button>
            </div>
            {showRestMenu && (
              <RestTimeOptions
                setTimer={setTimer}
                timerInterval={timerInterval}
                setShowResetMenu={setShowResetMenu}
                register={register}
                formData={formData}
              />
            )}
          </div>
        </div>
        <Input
          onClick={() => setShowPreviousWorkouts(true)}
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

        {showPrevoisWorkouts && (
          <DropDownWorkoutsList
            clearErrors={clearErrors}
            setComparableWorkoutName={setComparableWorkoutName}
            formData={formData}
            setShowPreviousWorkouts={setShowPreviousWorkouts}
          />
        )}

        <div className="flex flex-col gap-7">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-5">
            TARGETED MUSCLE:
          </h2>

          <div className="flex gap-[3rem]  sm:justify-start items-center flex-wrap ">
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
        <h2 className="text-3xl sm:text-4xl font-extrabold">
          Number of Sets :
        </h2>

        <div className="flex items-center gap-[5rem] ">
          <Input
            disabled={true}
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
              disabled={response.isLoading}
              type="button"
              size="sm"
              variation="primary"
              onClick={addSet}
            >
              +
            </Button>
            <Button
              disabled={response.isLoading}
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
            setArraySets={setSets}
            resetField={resetField}
            handleShowSetDetailsModal={setShowSetDetails}
            errors={errors}
            register={register}
            sets={sets}
            selectedSet={selectedSet}
            formData={formData}
          />
        )}

        <hr />

        {!showSuperSetForm && !showDropSetForm && (
          <div className="flex sm:items-center  flex-col sm:flex-row gap-12 justify-center  sm:justify-between">
            <div className="flex items-center justify-center gap-[3rem]">
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
            <div className="flex gap-5 sm:basis-[30rem]">
              <Button
                disabled={response.isLoading}
                type="submit"
                variation="primary"
                size="md"
              >
                Add Workout
              </Button>
              <Button
                disabled={response.isLoading}
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
          setSuperSets={setSuperSets}
          setToggleSets={setToggleSets}
          toggleSets={toggleSets}
          setShowSuperSetForm={setShowSuperSetForm}
          resetField={resetField}
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

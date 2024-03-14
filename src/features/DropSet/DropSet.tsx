import { useState } from "react";
import NewAddedSet from "../../components/Forms/CreateWorkout/Set/NewAddedSet/NewAddedSet";
import Input from "../../ui/Input/Input";
import Button from "../../ui/Button/Button";
import styles from "./DropSet.module.scss";
import { FaAnglesUp } from "react-icons/fa6";
import { ISetObject } from "../../interfaces/interfaces";
import SetDropSetDetails from "../../components/Forms/SetDropSetDetails/SetDropSetDetails";
import ChangeExtraSet from "../../ui/ChangeExtraSet/ChangeExtraSet";
import { scollMainContainer } from "../../helpers/getScroll";

function DropSet({
  unregister,
  setSelectedDropSet,
  register,
  errors,
  dropSets,
  selectedDropSet,
  formData,
  resetField,
  weightUnit,
  setWeightUnit,
  setShowModal,
  setShowDropSetForm,
  setDropSets,
  setValue,
  clearErrors,
  toggleSets,
  setToggleSets,
  setShowSuperSetForm,
}) {
  const [showDropSetDetails, setShowDropSetDetails] = useState<boolean>(false);

  function addSet() {
    const setNumbersInput = document.getElementById(
      "dropSetsNumber"
    )! as HTMLInputElement;

    const dropSetObject: ISetObject = {
      id: crypto.randomUUID(),
      setsWeight: "",
      setsReps: "",
      isCompleted: false,
      weightUnit: "",
    };

    setDropSets((dropSets) => [...dropSets, dropSetObject]);

    setValue("dropSetsNumber", Number(setNumbersInput.value) + 1);

    clearErrors("dropSetsNumber");
  }

  function removeSet() {
    if (formData.dropSetsNumber <= 0) return;

    const setNumbersInput = document.getElementById(
      "dropSetsNumber"
    )! as HTMLInputElement;

    const lastDropElement = dropSets[dropSets.length - 1];

    setDropSets((set) => set.filter((set) => set.id !== lastDropElement.id));

    setValue("dropSetsNumber", Number(setNumbersInput.value) - 1);
  }

  return (
    <div id="drop-set" className={styles["dropSet"]}>
      <div className="flex items-center justify-between">
        <h2 className="text-[4.5rem] font-extrabold text-blue-800 ">
          Drop Set
        </h2>
        <div className={styles["toggle-sets"]}>
          <ChangeExtraSet
            setShowSuperSetForm={setShowSuperSetForm}
            setShowDropSetForm={setShowDropSetForm}
            setToggleSets={setToggleSets}
            activeSet={toggleSets}
            unregister={unregister}
            setDropSets={setDropSets}
          />

          <span
            onClick={() => {
              unregister("dropSet");
              unregister("dropSetsNumber");
              setDropSets([]);
              setShowDropSetForm(false);
              scollMainContainer();
            }}
            className={styles["dropSet__icon"]}
          >
            <FaAnglesUp />
          </span>
        </div>
      </div>

      <h2 className="text-3xl font-semibold">
        Num of Drop sets :{" "}
        <span className="text-3xl text-blue-800">{dropSets.length}</span>
      </h2>

      <div className="flex items-center">
        <Input
          size="md"
          placeholder="DROP SETS:"
          id="dropSetsNumber"
          name="dropSetsNumber"
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
      {showDropSetDetails && (
        <SetDropSetDetails
          weightUnit={weightUnit}
          setWeightUnit={setWeightUnit}
          resetField={resetField}
          dropSets={dropSets}
          selectedDropSet={selectedDropSet}
          handleShowSetDetailsModal={setShowDropSetDetails}
          register={register}
          errors={errors}
          formData={formData}
        />
      )}

      <div className="flex items-center flex-wrap gap-[3rem]">
        {dropSets.map((set) => (
          <NewAddedSet
            showSetDetailsModal={showDropSetDetails}
            handleShowSetDetailsModal={setShowDropSetDetails}
            key={set.id}
            setSelectedSet={setSelectedDropSet}
            set={set}
            sets={dropSets}
          />
        ))}
      </div>

      <div className="flex gap-5  mt-8">
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
  );
}

export default DropSet;

import { useState } from "react";
import SetsDetails from "../../../../components/Forms/SetsDetails/SetsDetails";
import NewAddedSet from "../../../../components/NewAddedSet/NewAddedSet";
import Button from "../../../../ui/Button/Button";
import Input from "../../../../ui/Input/Input";
import { ISetObject } from "../../../../interfaces/interfaces";

function DropSetUpdateDetails({
  resetField,
  formData,
  setUpdateDropSets,
  updatedDropSets,
  register,
  errors,
  setValue,
  clearErrors,
  setSelectedUpdatedDropSet,
  selectedUpdatedDropSet,
}) {
  const [showDropSetDetails, setShowDropSetDetails] = useState<boolean>(false);

  const [weightUnit, setWeightUnit] = useState<string>("KG");

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

    setUpdateDropSets((dropSets) => [...dropSets, dropSetObject]);

    setValue("dropSetsNumber", Number(setNumbersInput.value) + 1);

    clearErrors("dropSetsNumber");
  }

  function removeSet() {
    if (formData.dropSetsNumber <= 1) return;

    const setNumbersInput = document.getElementById(
      "dropSetsNumber"
    )! as HTMLInputElement;

    const lastDropElement = updatedDropSets[updatedDropSets.length - 1];

    setUpdateDropSets((set) =>
      set.filter((set) => set.id !== lastDropElement.id)
    );

    setValue("dropSetsNumber", Number(setNumbersInput.value) - 1);
  }

  return (
    <div>
      <h2 className="text-3xl font-semibold mb-[2rem] mt-[2rem]">
        Num of Drop sets :{" "}
        <span className="text-3xl text-blue-800">{updatedDropSets.length}</span>
      </h2>

      <div className="flex items-center gap-[5rem] ">
        <Input
          size="md"
          placeholder="DROP SETS:"
          id="dropSetsNumber"
          name="dropSetsNumber"
          type="number"
          register={register}
          errors={errors}
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
        <SetsDetails
          setArraySets={setUpdateDropSets}
          weightUnit={weightUnit}
          setWeightUnit={setWeightUnit}
          resetField={resetField}
          sets={updatedDropSets}
          selectedSet={selectedUpdatedDropSet}
          handleShowSetDetailsModal={setShowDropSetDetails}
          register={register}
          errors={errors}
          formData={formData}
        />
      )}

      <div className="flex items-center flex-wrap gap-[3rem] mt-[2rem]">
        {updatedDropSets.map((set) => (
          <NewAddedSet
            showSetDetailsModal={showDropSetDetails}
            handleShowSetDetailsModal={setShowDropSetDetails}
            key={set.id}
            setSelectedSet={setSelectedUpdatedDropSet}
            set={set}
            sets={updatedDropSets}
          />
        ))}
      </div>
    </div>
  );
}

export default DropSetUpdateDetails;

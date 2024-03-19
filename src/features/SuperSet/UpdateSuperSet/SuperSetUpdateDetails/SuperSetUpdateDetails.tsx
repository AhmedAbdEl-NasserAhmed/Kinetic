import { useState } from "react";
import SetsDetails from "../../../../components/Forms/SetsDetails/SetsDetails";
import NewAddedSet from "../../../../components/NewAddedSet/NewAddedSet";
import Input from "../../../../ui/Input/Input";

function SuperSetUpdateDetails({
  resetField,
  formData,
  setUpdateSuperSets,
  updatedSuperSets,
  register,
  errors,
  setSelectedUpdatedSuperSet,
  selectedUpdatedSuperSet,
}) {
  const [showDropSetDetails, setShowDropSetDetails] = useState<boolean>(false);

  return (
    <div>
      <h2 className="text-4xl font-extrabold mb-8 mt-8">Super Set</h2>
      <Input
        id="superSetName"
        name="superSetName"
        size="lg"
        type="text"
        placeholder="super set workout Name"
        register={register}
        errors={errors}
        validiationInputs={{
          required: {
            value: true,
            message: "This field is required",
          },
        }}
      />
      <h2 className="text-3xl font-semibold mb-[2rem] mt-[2rem]">
        Num of Super sets :{" "}
        <span className="text-3xl text-blue-800">
          {updatedSuperSets.length}
        </span>
      </h2>

      {showDropSetDetails && (
        <SetsDetails
          setArraySets={setUpdateSuperSets}
          resetField={resetField}
          sets={updatedSuperSets}
          selectedSet={selectedUpdatedSuperSet}
          handleShowSetDetailsModal={setShowDropSetDetails}
          register={register}
          errors={errors}
          formData={formData}
        />
      )}

      <div className="flex items-center flex-wrap gap-[3rem] mt-[2rem]">
        {updatedSuperSets.map((set) => (
          <NewAddedSet
            showSetDetailsModal={showDropSetDetails}
            handleShowSetDetailsModal={setShowDropSetDetails}
            key={set.id}
            setSelectedSet={setSelectedUpdatedSuperSet}
            set={set}
            sets={updatedSuperSets}
          />
        ))}
      </div>
    </div>
  );
}

export default SuperSetUpdateDetails;

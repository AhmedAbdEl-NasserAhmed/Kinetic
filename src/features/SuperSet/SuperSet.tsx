import { useState } from "react";
import NewAddedSet from "../../components/NewAddedSet/NewAddedSet";
import Input from "../../ui/Input/Input";
import styles from "./SuperSet.module.scss";
import Button from "../../ui/Button/Button";
import { FaAnglesUp } from "react-icons/fa6";
import ChangeExtraSet from "../../ui/ChangeExtraSet/ChangeExtraSet";
import { scollMainContainer } from "../../helpers/getScroll";
import SetsDetails from "../../components/Forms/SetsDetails/SetsDetails";

function SuperSet({
  unregister,
  setSuperSets,
  setSelectedSuperSet,
  register,
  errors,
  superSets,
  selectedSuperSet,
  formData,
  resetField,
  setShowModal,
  setShowSuperSetForm,
  toggleSets,
  setToggleSets,
  setShowDropSetForm,
}) {
  const [showSuperSetDetails, setShowSuperSetDetails] = useState(false);

  function clearSuperSets() {
    superSets.map((set) => {
      set.isCompleted = false;
      set.setsReps = "";
      set.setsWeight = "";
      set.weightUnit = "";
    });
  }

  return (
    <div id="super-set" className={styles["superSet"]}>
      <div className="flex items-center justify-between">
        <h2 className="text-3xl sm:text-[4.5rem] font-extrabold text-blue-800 ">
          Super Set
        </h2>
        <div className={styles["toggle-sets"]}>
          <ChangeExtraSet
            setShowDropSetForm={setShowDropSetForm}
            setShowSuperSetForm={setShowSuperSetForm}
            setToggleSets={setToggleSets}
            activeSet={toggleSets}
            unregister={unregister}
          />
          <span
            onClick={() => {
              unregister("superSet");
              clearSuperSets();
              setShowSuperSetForm(false);
              scollMainContainer();
            }}
            className={styles["superSet__icon"]}
          >
            <FaAnglesUp />
          </span>
        </div>
      </div>
      <Input
        id="superSetName"
        name="superSet.superSetName"
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
      <h2 className="text-3xl font-semibold">
        Num of sets :{" "}
        <span className="text-3xl text-blue-800">{superSets.length}</span>
      </h2>

      {showSuperSetDetails && (
        <SetsDetails
          resetField={resetField}
          setArraySets={setSuperSets}
          sets={superSets}
          selectedSet={selectedSuperSet}
          handleShowSetDetailsModal={setShowSuperSetDetails}
          register={register}
          errors={errors}
          formData={formData}
        />
      )}

      <div className="flex items-center flex-wrap gap-[3rem]">
        {superSets.map((set) => (
          <NewAddedSet
            showSetDetailsModal={showSuperSetDetails}
            handleShowSetDetailsModal={setShowSuperSetDetails}
            key={set.id}
            setSelectedSet={setSelectedSuperSet}
            set={set}
            sets={superSets}
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

export default SuperSet;

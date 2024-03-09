import { useEffect, useRef } from "react";
import Input from "../../../../ui/Input/Input";
import { ISetObject } from "../../../../interfaces/interfaces";
import styles from "./SetSuperSetDetails.module.css";
import Button from "../../../../ui/Button/Button";

function SetSuperSetDetails({
  register,
  errors,
  handleShowSetDetailsModal,
  resetField,
  superSets,
  selectedSuperSet,
  formData,
  setWeightUnit,
  weightUnit,
}) {
  const overlayRef = useRef<HTMLElement>(null);

  const chosenSuperSet = superSets.find(
    (superSet: ISetObject) => superSet.id === selectedSuperSet.id
  );

  function modifySuperSet() {
    chosenSuperSet.setsWeight = +formData.superSet?.setsSuperSetWeight;

    chosenSuperSet.setsReps = +formData.superSet?.setsSuperSetReps;

    if (chosenSuperSet.setsWeight && chosenSuperSet.setsReps)
      chosenSuperSet.isCompleted = true;

    chosenSuperSet.weightUnit = weightUnit;
  }

  useEffect(() => {
    function handler(e: Event) {
      if (overlayRef.current === e.target) {
        handleShowSetDetailsModal(false);
        resetField("superSet.setsSuperSetReps");
        resetField("superSet.setsSuperSetWeight");
      }
    }
    window.addEventListener("click", handler);

    return () => window.removeEventListener("click", handler);
  }, [handleShowSetDetailsModal, resetField]);

  return (
    <div>
      <div className={styles["sets-details"]}>
        <div className="flex justify-between items-center">
          <h2 className="text-4xl font-extrabold">Reps and Weights</h2>
          <div className={styles["sets-details__weight-unit"]}>
            <span
              className={weightUnit === "KG" ? "bg-blue-800 text-white" : ""}
              onClick={() => setWeightUnit("KG")}
            >
              Kg
            </span>
            <span
              className={weightUnit === "LBS" ? "bg-blue-800 text-white" : ""}
              onClick={() => setWeightUnit("LBS")}
            >
              LBS
            </span>
          </div>
        </div>
        <Input
          size="lg"
          placeholder="REPS NUMBERS :"
          id="setsSuperSetReps"
          name="superSet.setsSuperSetReps"
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
        <Input
          size="lg"
          placeholder="REPS WEIGHT :"
          id="setsSuperSetWeight"
          name="superSet.setsSuperSetWeight"
          type="number"
          register={register}
          errors={errors}
          validiationInputs={{
            required: {
              value: true,
              message: "This Field is required",
            },
            min: {
              value: 5,
              message: "Minimun Weight number should be more than 5 kg",
            },
          }}
        />
        <div className="flex justify-center items-center gap-7">
          <Button
            onClick={() => {
              handleShowSetDetailsModal(false);
              modifySuperSet();
              resetField("superSet.setsSuperSetReps");
              resetField("superSet.setsSuperSetWeight");
            }}
            variation="primary"
            size="lg"
          >
            Ok
          </Button>
          <Button
            onClick={() => {
              handleShowSetDetailsModal(false);
              resetField("superSet.setsSuperSetReps");
              resetField("superSet.setsSuperSetWeight");
            }}
            variation="danger"
            size="lg"
          >
            Cancel
          </Button>
        </div>
      </div>
      <span ref={overlayRef} className={styles["overlay"]}>
        &nbsp;
      </span>
    </div>
  );
}

export default SetSuperSetDetails;

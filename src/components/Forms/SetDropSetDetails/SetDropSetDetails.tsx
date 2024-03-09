import { useEffect, useRef } from "react";
import Button from "../../../ui/Button/Button";
import Input from "../../../ui/Input/Input";
import styles from "./SetDropSetDetails.module.scss";
import { ISetObject } from "../../../interfaces/interfaces";

function SetDropSetDetails({
  register,
  errors,
  handleShowSetDetailsModal,
  resetField,
  dropSets,
  selectedDropSet,
  formData,
  setWeightUnit,
  weightUnit,
}) {
  const overlayRef = useRef<HTMLElement>(null);

  const chosenDropSet = dropSets.find(
    (dropSet: ISetObject) => dropSet.id === selectedDropSet.id
  );

  console.log("dropSets", dropSets);

  function modifyDropSet() {
    chosenDropSet.setsWeight = +formData.dropSet?.setsDropSetWeight;

    chosenDropSet.setsReps = +formData.dropSet?.setsDropSetReps;

    if (chosenDropSet.setsWeight && chosenDropSet.setsReps)
      chosenDropSet.isCompleted = true;

    chosenDropSet.weightUnit = weightUnit;
  }

  useEffect(() => {
    function handler(e: Event) {
      if (overlayRef.current === e.target) {
        handleShowSetDetailsModal(false);
        resetField("dorpSet.setsDropSetReps");
        resetField("dorpSet.setsDropSetWeight");
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
          id="setsDropSetReps"
          name="dropSet.setsDropSetReps"
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
          id="setsDropSetWeight"
          name="dropSet.setsDropSetWeight"
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
              modifyDropSet();
              resetField("dropSet.setsDropSetReps");
              resetField("dropSet.setsDropSetWeight");
            }}
            variation="primary"
            size="lg"
          >
            Ok
          </Button>
          <Button
            onClick={() => {
              handleShowSetDetailsModal(false);
              resetField("dropSet.setsDropSetReps");
              resetField("dropSet.setsDropSetWeight");
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

export default SetDropSetDetails;

import { useEffect, useRef } from "react";
import Button from "../../../ui/Button/Button";
import Input from "../../../ui/Input/Input";
import styles from "./SetsDetails.module.scss";
import { ISetObject } from "../../../interfaces/interfaces";

function SetsDetails({
  register,
  errors,
  handleShowSetDetailsModal,
  resetField,
  sets,
  selectedSet,
  formData,
  setWeightUnit,
  weightUnit,
}) {
  const overlayRef = useRef();

  const chosenSet = sets.find((set: ISetObject) => set.id === selectedSet.id);

  function modifySet() {
    chosenSet.setsWeight = +formData.setsDetailWeight;
    chosenSet.setsReps = +formData.setsDetailReps;
    chosenSet.isCompleted = true;
    chosenSet.weightUnit = weightUnit;
  }

  useEffect(() => {
    function handler(e: Event) {
      if (overlayRef.current === e.target) {
        handleShowSetDetailsModal(false);
      }
    }
    window.addEventListener("click", handler);

    return () => window.removeEventListener("click", handler);
  }, [handleShowSetDetailsModal]);

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
          id="setsDetailReps"
          name="setsDetailReps"
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
          id="setsDetailWeight"
          name="setsDetailWeight"
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
              modifySet();
              resetField("setsDetailReps");
              resetField("setsDetailWeight");
            }}
            variation="primary"
            size="lg"
          >
            Ok
          </Button>
          <Button
            onClick={() => {
              handleShowSetDetailsModal(false);
              resetField("setsDetailReps");
              resetField("setsDetailWeight");
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

export default SetsDetails;

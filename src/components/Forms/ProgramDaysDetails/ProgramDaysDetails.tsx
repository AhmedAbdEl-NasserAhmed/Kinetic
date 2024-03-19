import { useEffect, useRef } from "react";
import Button from "../../../ui/Button/Button";
import Input from "../../../ui/Input/Input";
import styles from "./ProgramDaysDetails.module.scss";
import { CustomDayProgram } from "../../../interfaces/interfaces";

function ProgramDaysDetails({
  register,
  errors,
  setShowDayDetails,
  resetField,
  programDays,
  selectedDay,
  formData,
}) {
  const overlayRef = useRef<HTMLElement>(null);

  const choosenDay = programDays.find(
    (day: CustomDayProgram) => day.id === selectedDay.id
  );

  function modifyDay() {
    choosenDay.name = formData.programDaysName;
    if (choosenDay.name) choosenDay.isCompleted = true;
  }

  useEffect(() => {
    function handler(e: Event) {
      if (overlayRef.current === e.target) {
        setShowDayDetails(false);
      }
    }
    window.addEventListener("click", handler);

    return () => window.removeEventListener("click", handler);
  }, [setShowDayDetails]);

  return (
    <div>
      <div className={styles["days-details"]}>
        <div className="flex justify-between items-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold">Program Days</h2>
        </div>
        <Input
          size="large"
          placeholder="Days Name :"
          id="programDaysName"
          name="programDaysName"
          type="text"
          register={register}
          errors={errors}
          validiationInputs={{
            required: {
              value: true,
              message: "This Field is required",
            },
          }}
        />

        <div className="flex justify-center items-center gap-7">
          <Button
            onClick={() => {
              setShowDayDetails(false);
              modifyDay();
              resetField("programDaysName");
            }}
            variation="primary"
            size="md"
          >
            Ok
          </Button>
          <Button
            onClick={() => {
              setShowDayDetails(false);
              resetField("programDaysName");
            }}
            variation="danger"
            size="md"
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

export default ProgramDaysDetails;

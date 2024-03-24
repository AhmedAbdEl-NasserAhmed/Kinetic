import { useEffect, useRef } from "react";
import { restTime } from "../../constants/RestTime";
import Button from "../../ui/Button/Button";
import HiddenRadioButton from "../HiddenRadioButton/HiddenRadioButton";
import styles from "./RestTimeOptions.module.scss";

function RestTimeOptions({
  register,
  formData,
  setShowResetMenu,
  timerInterval,
  setTimer,
}) {
  const overlayRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handler(e: Event) {
      if (overlayRef.current === e.target) {
        setShowResetMenu(false);
      }
    }
    window.addEventListener("click", handler);

    return () => window.removeEventListener("click", handler);
  }, [setShowResetMenu]);

  return (
    <>
      <div className={styles["rest-options"]}>
        <h2 className="text-3xl sm:text-4xl font-extrabold">
          Choose your rest Time
        </h2>
        <ul className="flex gap-10 items-center justify-center flex-wrap">
          {restTime.map((restTime) => {
            return (
              <HiddenRadioButton
                className={restTime.id === formData.restTime}
                key={restTime.id}
                label={restTime.label}
                name={restTime.name}
                id={restTime.id}
                value={restTime.value}
                register={{
                  ...register("restTime", {
                    required: {
                      value: true,
                      message: "This field is required",
                    },
                  }),
                }}
              />
            );
          })}
        </ul>
        <div className="flex items-center gap-[5rem] ">
          <Button
            onClick={() => {
              setTimer("00:00");
              clearInterval(timerInterval);
              setShowResetMenu(false);
            }}
            size="sm"
            variation="primary"
          >
            ok
          </Button>
          <Button
            onClick={() => setShowResetMenu(false)}
            size="sm"
            variation="danger"
          >
            cancel
          </Button>
        </div>
      </div>
      <span ref={overlayRef} className={styles["overlay"]}>
        &nbsp;
      </span>
    </>
  );
}

export default RestTimeOptions;

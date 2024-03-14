import { useEffect, useState } from "react";
import { HiArrowLeft, HiArrowRight } from "react-icons/hi2";
import styles from "./DateSlider.module.scss";

function DateSlider({ data, currentDateIndex, setCurrentDateIndex, today }) {
  const workoutTimes = data?.map((item) => item.workoutTime);

  const uniqueWorkoutTimes = [...new Set(workoutTimes)];

  const [currentIndex, setCurrentIndex] = useState<number>(
    uniqueWorkoutTimes.length
  );

  uniqueWorkoutTimes.sort(
    (a: string, b: string) => new Date(a).getTime() - new Date(b).getTime()
  );

  useEffect(() => {
    uniqueWorkoutTimes.push(today);

    setCurrentDateIndex(uniqueWorkoutTimes[currentIndex]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, setCurrentDateIndex, currentDateIndex]);

  function prevDate() {
    if (currentIndex <= 0) return;

    setCurrentIndex((index) => index - 1);
  }

  function nextDate() {
    if (currentIndex >= uniqueWorkoutTimes?.length - 1) return;

    setCurrentIndex((index) => index + 1);
  }

  return (
    <div className={styles["slider-container"]}>
      <span onClick={prevDate}>{<HiArrowLeft />}</span>
      <p>{today === currentDateIndex ? "Today" : currentDateIndex} </p>
      <span onClick={nextDate}>{<HiArrowRight />}</span>
    </div>
  );
}

export default DateSlider;

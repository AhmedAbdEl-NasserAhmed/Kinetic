const whistle = new Audio("../../referee-whistle.mp3");

export function restTimeTimer(setTimer, duration, setTimerInterval) {
  let time = Number(duration);

  function tick() {
    const minutes = String(Math.trunc(time / 60)).padStart(2, "0");

    const seconds = String(Math.trunc(time % 60)).padStart(2, "0");

    setTimer(`${minutes}:${seconds}`);

    if (time === 0) {
      clearInterval(timer);
      whistle.play();
    }

    time--;
  }

  tick();

  const timer = setInterval(tick, 1000);

  setTimerInterval(timer);
}

export function getScroll(scrollableContainer: string) {
  const workoutContainer = document.getElementById(
    "create-workout"
  )! as HTMLFormElement;

  setTimeout(() => {
    workoutContainer.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }, 100);

  setTimeout(() => {
    const position = document.getElementById(scrollableContainer);

    position.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, 500);
}

export function scollMainContainer() {
  setTimeout(() => {
    const workoutContainer = document.getElementById(
      "create-workout"
    )! as HTMLFormElement;

    workoutContainer.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }, 100);
}

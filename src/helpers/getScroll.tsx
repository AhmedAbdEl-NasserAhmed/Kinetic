export function getScroll(scrollableContainer: string) {
  setTimeout(() => {
    const position = document.getElementById(scrollableContainer);

    position.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, 1000);
}

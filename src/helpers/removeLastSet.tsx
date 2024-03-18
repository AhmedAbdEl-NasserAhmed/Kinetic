export function removeLastSet(
  condition,
  containerValue,
  array,
  setArray,
  setValue
) {
  if (condition) return;

  const setNumbersInput = document.getElementById(
    containerValue
  )! as HTMLInputElement;

  const lastElement = array[array.length - 1];

  setArray((set) => set.filter((set) => set.id !== lastElement.id));

  setValue(containerValue, Number(setNumbersInput.value) - 1);
}

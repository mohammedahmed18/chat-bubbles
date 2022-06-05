const makeInputActive = (ref) => {
  ref.current.focus();
};
export const handleKeyDown = (event, ref, focused, handleSubmit) => {
  const key = event.key.toLowerCase();
  if (event.key === "Enter") {
    // submit note
    handleSubmit();
    return;
  }
  if (event.keyCode == "8") {
    if (!focused) {
      //make the input active
      makeInputActive(ref);
    }
  }
  if (key.length !== 1) {
    return;
  }

  const isLetter = key >= "a" && key <= "z";
  const isNumber = key >= "0" && key <= "9";

  if (isLetter || isNumber) {
    // Do something
    if (!focused) {
      // make th input active
      makeInputActive(ref);
    }
  }
};

import { actions } from "../actions";

const InputComponent = (): void => {
  const input = document.getElementById("input");

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const value = (event.target as HTMLInputElement).value;

      (input as HTMLInputElement).value = "";
      actions.addItem({ content: value, complete: false });
    }
  });
};

export default InputComponent;

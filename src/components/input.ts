import { store } from "../index";
import { addItem } from "../state/actions";

const InputComponent = (): void => {
  const input = document.getElementById("input");

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const value = (event.target as HTMLInputElement).value;

      (input as HTMLInputElement).value = "";
      store.dispatch(addItem({ content: value, complete: false }));
    }
  });
};

export default InputComponent;

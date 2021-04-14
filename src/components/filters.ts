import { FilterType } from "../interfaces";
import { store } from "../index";
import { changeActiveFilter } from "../state/actions";

const FiltersComponent = (): void => {
  const filtersEl = document.querySelector("#filters");

  renderFilterBtn(document.querySelector("#allFilterBtn"), FilterType.ALL);
  renderFilterBtn(document.querySelector("#completeFilterBtn"), FilterType.COMPLETE);
  renderFilterBtn(document.querySelector("#openFilterBtn"), FilterType.OPEN);

  function renderFilterBtn(element: Element, type: FilterType): void {
    element.addEventListener("click", () => {
      store.dispatch(changeActiveFilter(type));
      clearFilterButtonsClasses();
      element.classList.add("selected");
    });
  }

  function clearFilterButtonsClasses(): void {
    filtersEl.querySelectorAll("button").forEach((item) => {
      item.classList.remove("selected");
    });
  }
};

export default FiltersComponent;

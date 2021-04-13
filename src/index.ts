import { map } from "rxjs/operators";
import "./styles.scss";

import { Counters, FilterType, TodoItem } from "./models";
import { state as _state, action as _action, selectCounters } from "./store";
import { actions } from "./actions";

export const action = _action();
export const state = _state(action);

renderInput();
renderFilters();

state.subscribe(({ items, activeFilter }) => {
  renderList(items, activeFilter);
});
state.pipe(map(selectCounters)).subscribe((counters) => {
  renderCounters(counters);
});

function renderInput(): void {
  const input = document.getElementById("input");

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const value = (event.target as HTMLInputElement).value;

      (input as HTMLInputElement).value = "";
      actions.addItem({ content: value, complete: false });
    }
  });
}

function renderFilters(): void {
  const filtersEl = document.querySelector("#filters");

  renderFilterBtn(document.querySelector("#allFilterBtn"), FilterType.ALL);
  renderFilterBtn(document.querySelector("#completeFilterBtn"), FilterType.COMPLETE);
  renderFilterBtn(document.querySelector("#openFilterBtn"), FilterType.OPEN);

  function renderFilterBtn(element: Element, type: FilterType): void {
    element.addEventListener("click", () => {
      actions.changeActiveFilter(type);
      clearFilterButtonsClasses();
      element.classList.add("selected");
    });
  }

  function clearFilterButtonsClasses(): void {
    filtersEl.querySelectorAll("button").forEach((item) => {
      item.classList.remove("selected");
    });
  }
}

function renderList(items: TodoItem[], activeFilter: FilterType): void {
  const list = document.getElementById("list");

  list.innerHTML = "";
  items
    .filter((item) => {
      switch (activeFilter) {
        case FilterType.ALL:
          return true;
        case FilterType.COMPLETE:
          return item.complete;
        case FilterType.OPEN:
          return !item.complete;
      }
    })
    .forEach((item) => {
      const el = createItemElement(item);
      list.append(el);
    });

  document.querySelectorAll(".item").forEach((item) => {
    const id = +item.getAttribute("data-id");

    item.addEventListener("click", () => {
      actions.changeItemStatus(id);
    });

    item.querySelector(".item__close").addEventListener("click", (event) => {
      event.stopPropagation();
      actions.removeItem(id);
    });
  });
}

function renderCounters(counters: Counters): void {
  const totalCounterEl = document.querySelector("#totalCounter");
  const completeCounterEl = document.querySelector("#completeCounter");
  const openCounterEl = document.querySelector("#openCounter");

  totalCounterEl.innerHTML = `${counters.open + counters.complete}`;
  completeCounterEl.innerHTML = `${counters.complete}`;
  openCounterEl.innerHTML = `${counters.open}`;
}

function createItemElement({ content, complete, id }: TodoItem): HTMLDivElement {
  const el = document.createElement("div");

  el.setAttribute("data-id", id.toString());
  el.classList.add("item");

  el.innerHTML = `
    <div class="item__content">
        <div class="item__status"></div>
        <span class="item__label">${content}</span>
    </div>
    <button class="item__close">&times;</button>
`;

  if (complete) {
    el.classList.add("item--complete");
  }

  return el;
}

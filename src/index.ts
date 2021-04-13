import _store from "./store";
import { FilterType, TodoItem } from "./models";
import "./styles.scss";

export const store = _store();

renderInput();
renderContent();
renderFilters();

function renderInput(): void {
  const input = document.getElementById("input");

  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const value = (event.target as HTMLInputElement).value;

      (input as HTMLInputElement).value = "";
      store.addItem({ content: value, done: false });
      renderContent();
    }
  });
}

function renderContent(): void {
  renderList();
  renderCounters();
}

function renderFilters(): void {
  const filtersEl = document.querySelector("#filters");

  renderFilterBtn(document.querySelector("#allFilterBtn"), FilterType.ALL);
  renderFilterBtn(document.querySelector("#completeFilterBtn"), FilterType.COMPLETE);
  renderFilterBtn(document.querySelector("#openFilterBtn"), FilterType.OPEN);

  function renderFilterBtn(element: Element, type: FilterType): void {
    element.addEventListener("click", () => {
      store.changeActiveFilter(type);
      clearFilterButtonsClasses();
      element.classList.add("selected");
      renderContent();
    });
  }

  function clearFilterButtonsClasses(): void {
    filtersEl.querySelectorAll("button").forEach((item) => {
      item.classList.remove("selected");
    });
  }
}

function renderList(): void {
  const items = store.getItems();
  const activeFilter = store.getActiveFilter();
  const list = document.getElementById("list");

  list.innerHTML = "";
  items
    .filter((item) => {
      switch (activeFilter) {
        case FilterType.ALL:
          return true;
        case FilterType.COMPLETE:
          return item.done;
        case FilterType.OPEN:
          return !item.done;
      }
    })
    .forEach((item) => {
      const el = createItemElement(item);
      list.append(el);
    });

  document.querySelectorAll(".item").forEach((item) => {
    const id = +item.getAttribute("data-id");

    item.addEventListener("click", () => {
      store.changeItemStatus(id);
      renderContent();
    });

    item.querySelector(".item__close").addEventListener("click", (event) => {
      event.stopPropagation();
      store.removeItem(id);
      renderContent();
    });
  });
}

function renderCounters(): void {
  const counters = store.getCounters();

  const totalCounterEl = document.querySelector("#totalCounter");
  const completeCounterEl = document.querySelector("#completeCounter");
  const openCounterEl = document.querySelector("#openCounter");

  totalCounterEl.innerHTML = `${counters.open + counters.done}`;
  completeCounterEl.innerHTML = `${counters.done}`;
  openCounterEl.innerHTML = `${counters.open}`;
}

function createItemElement({ content, done, id }: TodoItem): HTMLDivElement {
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

  if (done) {
    el.classList.add("item--done");
  }

  return el;
}

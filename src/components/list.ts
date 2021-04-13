import { FilterType, TodoItem } from "../models";
import { actions } from "../actions";
import ItemComponent from "./item";
import { state } from "../index";

const ListComponent = (): void => {
  const list = document.getElementById("list");

  render([], FilterType.ALL);

  state.subscribe(({ items, activeFilter }) => {
    render(items, activeFilter);
  });

  function render(items: TodoItem[], activeFilter: FilterType): void {
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
        const component = ItemComponent(item);
        component.clicked.subscribe(() => {
          actions.changeItemStatus(item.id);
        });
        component.removed.subscribe(() => {
          actions.removeItem(item.id);
        });
        list.append(component.el);
      });
  }
};

export default ListComponent;

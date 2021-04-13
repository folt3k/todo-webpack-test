import { FilterType, TodoItem } from "./models";
import { action } from "./index";
import { types } from "./action-types";

export const actions = {
  addItem: (item: TodoItem) => {
    action.next({ type: types.ADD_ITEM, payload: item });
  },
  removeItem: (id: number) => {
    action.next({ type: types.REMOVE_ITEM, payload: id });
  },
  changeItemStatus: (id: number) => {
    action.next({ type: types.CHANGE_ITEM_STATUS, payload: id });
  },
  changeActiveFilter: (filter: FilterType) => {
    action.next({ type: types.CHANGE_ACTIVE_FILTER, payload: filter });
  },
};

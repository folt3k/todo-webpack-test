import { FilterType, TodoItem } from "../interfaces";
import types from "./types";
import { Action } from "../store";

export const addItem = (item: TodoItem): Action => ({ type: types.ADD_ITEM, payload: item });
export const removeItem = (id: number): Action => ({ type: types.REMOVE_ITEM, payload: id });
export const changeItemStatus = (id: number): Action => ({ type: types.CHANGE_ITEM_STATUS, payload: id });
export const changeActiveFilter = (filter: FilterType): Action => ({
  type: types.CHANGE_ACTIVE_FILTER,
  payload: filter,
});

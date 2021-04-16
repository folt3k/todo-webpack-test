import { FilterType, TodoItem } from '../interfaces';
import { Action } from '../store';
import types from './types';

export interface State {
  items: TodoItem[];
  activeFilter: FilterType;
  id: number;
}

const initialState: State = {
  items: [],
  activeFilter: FilterType.ALL,
  id: 0,
};

const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case types.ADD_ITEM:
      return {
        ...state,
        id: state.id + 1,
        items: [{ ...action.payload, id: state.id + 1 }, ...state.items],
      };
    case types.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => action.payload !== item.id),
      };
    case types.CHANGE_ITEM_STATUS:
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload ? { ...item, complete: !item.complete } : item
        ),
      };
    case types.CHANGE_ACTIVE_FILTER:
      return {
        ...state,
        activeFilter: action.payload,
      };
    default:
      return initialState;
  }
};

export default reducer;

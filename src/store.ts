import { FilterType, TodoItem } from "./models";

export interface CountersState {
  open: number;
  done: number;
}

export type ItemsState = TodoItem[];

export interface State {
  counters: CountersState;
  items: ItemsState;
  activeFilter: FilterType;
}

export default function () {
  let id = 0;
  const state: State = {
    counters: {
      open: 0,
      done: 0,
    },
    items: [],
    activeFilter: FilterType.ALL,
  };

  return {
    getCounters: () => state.counters,
    getItems: () => state.items,
    getActiveFilter: () => state.activeFilter,
    addItem: (item: TodoItem) => {
      id = id + 1;
      state.items = [{ ...item, id }, ...state.items];
      state.counters = {
        ...state.counters,
        open: state.counters.open + 1,
      };
    },
    removeItem: (id: number) => {
      state.items = state.items.filter((item) => id !== item.id);
      state.counters = {
        open: state.items.filter((item) => !item.done).length,
        done: state.items.filter((item) => item.done).length,
      };
    },
    changeItemStatus: (id: number) => {
      state.items = state.items.map((item) => (item.id == id ? { ...item, done: !item.done } : item));
      state.counters = {
        open: state.items.filter((item) => !item.done).length,
        done: state.items.filter((item) => item.done).length,
      };
    },
    changeActiveFilter: (filter: FilterType) => {
      state.activeFilter = filter;
    },
  };
}

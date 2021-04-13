import { BehaviorSubject, Observable, Subject } from "rxjs";
import { withLatestFrom } from "rxjs/operators";

import { Counters, FilterType, TodoItem } from "./models";
import { types } from "./action-types";

// interfaces

export type ItemsState = TodoItem[];

export interface Action {
  next: <T>(data: { type: string; payload?: T }) => void;
  listen: Observable<{ type: string; payload: any }>;
}

export interface State {
  items: ItemsState;
  activeFilter: FilterType;
  id: number;
}

// action object

export function action(): Action {
  const action$ = new Subject<{ type: string; payload: any }>();

  return {
    next: <T>({ type, payload }: { type: string; payload?: T }) => {
      action$.next({ type, payload });
    },
    listen: action$.asObservable(),
  };
}

// state

export function state(action: Action) {
  const initialState: State = {
    items: [],
    activeFilter: FilterType.ALL,
    id: 0,
  };
  const state$ = new BehaviorSubject<State>(initialState);

  action.listen.pipe(withLatestFrom(state$)).subscribe(([{ type, payload }, state]) => {
    const newState = () => {
      switch (type) {
        case types.ADD_ITEM:
          return {
            ...state,
            id: state.id + 1,
            items: [{ ...payload, id: state.id + 1 }, ...state.items],
          };
        case types.REMOVE_ITEM:
          return {
            ...state,
            items: state.items.filter((item) => payload !== item.id),
          };
        case types.CHANGE_ITEM_STATUS:
          return {
            ...state,
            items: state.items.map((item) =>
              item.id === payload ? { ...item, complete: !item.complete } : item
            ),
          };
        case types.CHANGE_ACTIVE_FILTER:
          return {
            ...state,
            activeFilter: payload,
          };
      }
    };
    state$.next(newState());
  });

  return state$.asObservable();
}

// selectors

export const selectCounters = (state: State): Counters => ({
  total: state.items.length,
  complete: state.items.filter((i) => i.complete).length,
  open: state.items.filter((i) => !i.complete).length,
});

import { BehaviorSubject, Observable } from "rxjs";
import { scan, share } from "rxjs/operators";

export interface Action<T = any> {
  type: string;
  payload?: T;
}

export type Reducer<T> = (state: T, action: Action) => T;

const createStore = <T = any>(reducer: Reducer<T>) => {
  const action$ = new BehaviorSubject<Action>({ type: null });
  const state$: Observable<T> = action$.pipe(scan(reducer, undefined), share());

  return {
    dispatch: action$.next.bind(action$),
    select: state$,
  };
};

export default createStore;

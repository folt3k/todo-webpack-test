import { BehaviorSubject, Observable } from 'rxjs';
import { scan, share } from 'rxjs/operators';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface Action<T = any> {
  type: string;
  payload?: T;
}

export type Reducer<T> = (state: T, action: Action) => T;

export interface Store<T> {
  dispatch: (action: Action) => void;
  select: Observable<T>;
}

const createStore = <T>(reducer: Reducer<T>): Store<T> => {
  const action$ = new BehaviorSubject<Action>({ type: null });
  const state$: Observable<T> = action$.pipe(scan(reducer, undefined), share());

  return {
    dispatch: action$.next.bind(action$),
    select: state$,
  };
};

export default createStore;

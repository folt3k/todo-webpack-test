import { Counters } from "../interfaces";
import { State } from "./reducer";

export const selectCounters = (state: State): Counters => ({
  total: state.items.length,
  complete: state.items.filter((i) => i.complete).length,
  open: state.items.filter((i) => !i.complete).length,
});

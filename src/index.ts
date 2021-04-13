import "./styles.scss";

import { state as _state, action as _action } from "./store";

import InputComponent from "./components/input";
import FiltersComponent from "./components/filters";
import CountersComponent from "./components/counters";
import ListComponent from "./components/list";

export const action = _action();
export const state = _state(action);

InputComponent();
FiltersComponent();
ListComponent();
CountersComponent();

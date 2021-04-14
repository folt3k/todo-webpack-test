import { map } from "rxjs/operators";

import { Counters } from "../interfaces";
import { store } from "../index";
import { selectCounters } from "../state/selectors";

const CountersComponent = (): void => {
  const totalCounterEl = document.querySelector("#totalCounter");
  const completeCounterEl = document.querySelector("#completeCounter");
  const openCounterEl = document.querySelector("#openCounter");

  store.select.pipe(map(selectCounters)).subscribe((counters) => {
    render(counters);
  });

  function render(counters: Counters): void {
    totalCounterEl.innerHTML = `${counters.open + counters.complete}`;
    completeCounterEl.innerHTML = `${counters.complete}`;
    openCounterEl.innerHTML = `${counters.open}`;
  }
};

export default CountersComponent;

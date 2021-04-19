import createStore from '../../store';
import reducer, { State } from '../../state/reducer';
import FiltersComponent from '../filters';

describe('filters component', () => {
  it('should render correct', () => {
    const store = createStore<State>(reducer);
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    document.body.innerHTML = `<div id="filters">
        <button id="allFilterBtn" class="selected">All</button>
        <button id="completeFilterBtn">Complete</button>
        <button id="openFilterBtn">Open</button>
      </div>`;

    FiltersComponent({ store });

    const allFilterBtn = document.querySelector('#allFilterBtn');
    const completeFilterBtn = document.querySelector('#completeFilterBtn') as HTMLElement;
    const openFilterBtn = document.querySelector('#openFilterBtn');

    completeFilterBtn.click();

    expect(dispatchSpy).toHaveBeenCalled();
    expect(completeFilterBtn.classList.contains('selected')).toBeTruthy();
    expect(allFilterBtn.classList.contains('selected')).toBeFalsy();
    expect(openFilterBtn.classList.contains('selected')).toBeFalsy();
  });
});

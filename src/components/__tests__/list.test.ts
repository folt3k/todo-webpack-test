import createStore from '../../store';
import reducer, { State } from '../../state/reducer';
import { addItem, changeActiveFilter, changeItemStatus, removeItem } from '../../state/actions';
import ListComponent from '../list';
import { FilterType } from '../../interfaces';

describe('list component', () => {
  it('should render correct', () => {
    const store = createStore<State>(reducer);
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    document.body.innerHTML = `<div id="list"></div>`;

    const list = document.getElementById('list');

    ListComponent({ store });

    expect(list.hasChildNodes()).toBeFalsy();

    store.dispatch(addItem({ content: 'Foo', complete: false }));
    store.dispatch(addItem({ content: 'Bar', complete: true }));

    expect(list.childElementCount).toBe(2);

    store.dispatch(changeActiveFilter(FilterType.COMPLETE));

    expect(list.childElementCount).toBe(1);

    store.dispatch(changeActiveFilter(FilterType.OPEN));

    expect(list.childElementCount).toBe(1);

    const item = list.querySelector('.item');

    (item.querySelector('.item__status') as HTMLElement).click();

    expect(dispatchSpy).toHaveBeenLastCalledWith(changeItemStatus(1));

    (item.querySelector('.item__close') as HTMLElement).click();

    expect(dispatchSpy).toHaveBeenLastCalledWith(removeItem(1));
  });
});

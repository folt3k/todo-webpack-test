import { take } from 'rxjs/operators';

import { FilterType, TodoItem } from '../interfaces';
import ItemComponent from './item';
import { changeItemStatus, removeItem } from '../state/actions';
import { Store } from '../store';
import { State } from '../state/reducer';

const ListComponent = ({ store }: { store: Store<State> }): void => {
  const list = document.getElementById('list');

  render([], FilterType.ALL);

  store.select.subscribe(({ items, activeFilter }) => {
    render(items, activeFilter);
  });

  function render(items: TodoItem[], activeFilter: FilterType): void {
    list.innerHTML = '';
    items
      .filter((item) => {
        switch (activeFilter) {
          case FilterType.ALL:
            return true;
          case FilterType.COMPLETE:
            return item.complete;
          case FilterType.OPEN:
            return !item.complete;
        }
      })
      .forEach((item) => {
        const component = ItemComponent(item);

        component.clicked.pipe(take(1)).subscribe(() => {
          store.dispatch(changeItemStatus(item.id));
        });
        component.removed.pipe(take(1)).subscribe(() => {
          store.dispatch(removeItem(item.id));
        });
        list.append(component.el);
      });
  }
};

export default ListComponent;

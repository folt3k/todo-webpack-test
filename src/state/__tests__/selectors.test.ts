import { FilterType } from '../../interfaces';
import { selectCounters } from '../selectors';

describe('todo selectors', () => {
  it('should return counters', () => {
    expect(
      selectCounters({
        items: [
          { content: 'Foo', complete: true },
          { content: 'Foo', complete: false },
        ],
        activeFilter: FilterType.ALL,
        id: 2,
      })
    ).toEqual({ total: 2, complete: 1, open: 1 });
  });
});

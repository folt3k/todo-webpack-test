import reducer from '../reducer';
import { FilterType } from '../../interfaces';
import types from '../types';

describe('todos reducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, { type: null })).toEqual({
      items: [],
      activeFilter: FilterType.ALL,
      id: 0,
    });
  });
  it('should handle add todo action', () => {
    expect(
      reducer(undefined, { type: types.ADD_ITEM, payload: { content: 'Foo', complete: false } })
    ).toEqual({
      items: [{ content: 'Foo', complete: false, id: 1 }],
      activeFilter: FilterType.ALL,
      id: 1,
    });
  });
  it('should handle remove todo action', () => {
    expect(
      reducer(
        {
          items: [{ content: 'Foo', complete: false, id: 1 }],
          activeFilter: FilterType.ALL,
          id: 1,
        },
        { type: types.REMOVE_ITEM, payload: 1 }
      )
    ).toEqual({
      items: [],
      activeFilter: FilterType.ALL,
      id: 1,
    });
  });
  it('should handle change todo status action', () => {
    expect(
      reducer(
        {
          items: [
            { content: 'Foo', complete: false, id: 1 },
            { content: 'Foo', complete: false, id: 2 },
          ],
          activeFilter: FilterType.ALL,
          id: 1,
        },
        { type: types.CHANGE_ITEM_STATUS, payload: 1 }
      )
    ).toEqual({
      items: [
        { content: 'Foo', complete: true, id: 1 },
        { content: 'Foo', complete: false, id: 2 },
      ],
      activeFilter: FilterType.ALL,
      id: 1,
    });
  });
  it('should handle change active filter action', () => {
    expect(
      reducer(
        {
          items: [],
          activeFilter: FilterType.ALL,
          id: 0,
        },
        { type: types.CHANGE_ACTIVE_FILTER, payload: FilterType.OPEN }
      )
    ).toEqual({
      items: [],
      activeFilter: FilterType.OPEN,
      id: 0,
    });
  });
});

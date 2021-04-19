import * as actions from '../actions';
import types from '../types';
import { FilterType } from '../../interfaces';

describe('todos actions', () => {
  it('should create action to add todo item', () => {
    const data = { content: 'test', complete: false };
    expect(actions.addItem(data)).toEqual({ type: types.ADD_ITEM, payload: data });
  });
  it('should create action to remove todo item', () => {
    expect(actions.removeItem(1)).toEqual({ type: types.REMOVE_ITEM, payload: 1 });
  });
  it('should create action to change todo status', () => {
    expect(actions.changeItemStatus(1)).toEqual({ type: types.CHANGE_ITEM_STATUS, payload: 1 });
  });
  it('should create action to change active filter', () => {
    expect(actions.changeActiveFilter(FilterType.ALL)).toEqual({
      type: types.CHANGE_ACTIVE_FILTER,
      payload: FilterType.ALL,
    });
  });
});

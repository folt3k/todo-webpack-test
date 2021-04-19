import createStore from '../../store';
import CountersComponent from '../counters';
import reducer, { State } from '../../state/reducer';
import { addItem } from '../../state/actions';

describe('counters component', () => {
  it('should render correct', (done) => {
    const store = createStore<State>(reducer);

    document.body.innerHTML = `<div id="stats">
        <span><strong id="totalCounter">0</strong> tasks</span>
        <span><strong id="completeCounter">0</strong> complete</span>
        <span><strong id="openCounter">0</strong> open</span>
      </div>`;

    CountersComponent({ store });

    store.dispatch(addItem({ content: 'Foo', complete: false }));
    store.dispatch(addItem({ content: 'Bar', complete: true }));

    setTimeout(() => {
      expect(document.querySelector('#totalCounter').innerHTML).toBe('2');
      expect(document.querySelector('#completeCounter').innerHTML).toBe('1');
      expect(document.querySelector('#openCounter').innerHTML).toBe('1');

      done();
    }, 1000);
  });
});

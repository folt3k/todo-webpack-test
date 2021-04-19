import { addItem } from '../state/actions';
import { Store } from '../store';
import { State } from '../state/reducer';

const InputComponent = ({ store }: { store: Store<State> }): void => {
  const input = document.getElementById('input');

  input.addEventListener('keydown', (event) => {
    if (event.keyCode === 13) {
      const value = (event.target as HTMLInputElement).value;

      (input as HTMLInputElement).value = '';
      store.dispatch(addItem({ content: value, complete: false }));
    }
  });
};

export default InputComponent;

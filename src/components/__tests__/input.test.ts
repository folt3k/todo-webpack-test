import createStore from '../../store';
import reducer, { State } from '../../state/reducer';
import InputComponent from '../input';

describe('input component', () => {
  it('should render correct', () => {
    const store = createStore<State>(reducer);
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    document.body.innerHTML = `<input id="input" type="text" placeholder="Wpisz zadanie.." />`;

    InputComponent({ store });

    const input = document.getElementById('input');

    input.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 10 }));

    expect(dispatchSpy).not.toHaveBeenCalled();

    input.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 13 }));

    expect(dispatchSpy).toHaveBeenCalled();
    expect((input as HTMLInputElement).value).toBeFalsy();
  });
});

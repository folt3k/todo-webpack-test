import './styles.scss';

import createStore from './store';
import reducer, { State } from './state/reducer';

import InputComponent from './components/input';
import FiltersComponent from './components/filters';
import CountersComponent from './components/counters';
import ListComponent from './components/list';

export const store = createStore<State>(reducer);

InputComponent({ store });
FiltersComponent({ store });
ListComponent({ store });
CountersComponent({ store });

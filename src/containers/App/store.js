import { combineReducers, createStore } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import {
  cryptoTableReducer,
  newOrderTableReducer,
  sidebarReducer,
  widgetsReducer,
  themeReducer,
  profileReducer,
  customizerReducer,
} from '../../redux/reducers/index';


const reducer = combineReducers({
  form: reduxFormReducer, // mounted under "form",
  theme: themeReducer,
  sidebar: sidebarReducer,
  cryptoTable: cryptoTableReducer,
  newOrder: newOrderTableReducer,
  customizer: customizerReducer,
  profile  : profileReducer,
  widgets : widgetsReducer
});
const store = createStore(reducer);

export default store;

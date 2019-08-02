import { combineReducers, createStore } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import {
  cryptoTableReducer,
  newOrderTableReducer,
  sidebarReducer,
  appCreationReducer,
  themeReducer,
  profileReducer,
  messageContainerReducer,
  gameReducer,
  customizerReducer,
} from '../../redux/reducers/index';


const reducer = combineReducers({
    form: reduxFormReducer, // mounted under "form",
    theme: themeReducer,
    sidebar: sidebarReducer,
    cryptoTable: cryptoTableReducer,
    game : gameReducer,
    message : messageContainerReducer,
    newOrder: newOrderTableReducer,
    customizer: customizerReducer,
    profile  : profileReducer,
    appCreation : appCreationReducer
});
const store = createStore(reducer);

export default store;

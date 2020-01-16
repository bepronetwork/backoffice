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
  set2FAReducer,
  gameReducer,
  userViewReducer,
  periodicityReducer,
  modalReducer,
  customizerReducer,
  walletReducer,
  currencyReducer
} from '../../redux/reducers/index';


const reducer = combineReducers({
    form: reduxFormReducer, // mounted under "form",
    theme: themeReducer,
    sidebar: sidebarReducer,
    cryptoTable: cryptoTableReducer,
    wallet : walletReducer,
    game : gameReducer,
    userView : userViewReducer,
    message : messageContainerReducer,
    newOrder: newOrderTableReducer,
    set2FA : set2FAReducer,
    modal : modalReducer,
    customizer: customizerReducer,
    currency : currencyReducer,
    periodicity : periodicityReducer,
    profile  : profileReducer,
    appCreation : appCreationReducer
});
const store = createStore(reducer);

export default store;

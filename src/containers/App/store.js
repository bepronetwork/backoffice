import { combineReducers, createStore } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import {
  cryptoTableReducer,
  newOrderTableReducer,
  sidebarReducer,
  appCreationReducer,
  themeReducer,
  profileReducer,
  loadingReducer,
  messageContainerReducer,
  set2FAReducer,
  gameReducer,
  userViewReducer,
  periodicityReducer,
  modalReducer,
  customizerReducer,
  walletReducer,
  currencyReducer,
  addCurrencyWalletReducer,
  videogamesReducer
} from '../../redux/reducers/index';


const reducer = combineReducers({
    form: reduxFormReducer, // mounted under "form",
    theme: themeReducer,
    sidebar: sidebarReducer,
    cryptoTable: cryptoTableReducer,
    wallet : walletReducer,
    game : gameReducer,
    userView : userViewReducer,
    isLoading : loadingReducer,
    message : messageContainerReducer,
    newOrder: newOrderTableReducer,
    set2FA : set2FAReducer,
    modal : modalReducer,
    customizer: customizerReducer,
    currency : currencyReducer,
    periodicity : periodicityReducer,
    profile  : profileReducer,
    appCreation : appCreationReducer,
    addCurrencyWallet : addCurrencyWalletReducer,
    videogames: videogamesReducer
});
const store = createStore(reducer);

export default store;

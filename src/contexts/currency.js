import React from 'react';

const CurrencyContext = React.createContext();
const CurrencyDispatchContext = React.createContext();

const actions = {
  SET_CURRENCY: 'currency/set'
};

function currencyReducer(state, action) {
  switch (action.type) {
    case actions.SET_CURRENCY: {
      return { currency: action.payload };
    }
    default: {
      return state;
    }
  }
}

function CurrencyProvider({ children }) {
  const [state, dispatch] = React.useReducer(currencyReducer, {
    currency: null
  });
  return (
    <CurrencyContext.Provider value={state}>
      <CurrencyDispatchContext.Provider value={dispatch}>
        {children}
      </CurrencyDispatchContext.Provider>
    </CurrencyContext.Provider>
  );
}

export default CurrencyProvider;

export { actions, CurrencyContext, CurrencyDispatchContext };

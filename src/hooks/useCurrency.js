import React from 'react';

import {
  actions,
  CurrencyContext,
  CurrencyDispatchContext
} from 'contexts/currency';

/**
 * Hook to handle currency changes
 * @returns {(Object|Function)} Currency and update function
 */
function useCurrency() {
  const { currency } = React.useContext(CurrencyContext);
  const dispatch = React.useContext(CurrencyDispatchContext);

  /**
   *
   * @param {Object} newCurrency New currency for global context
   */
  function setCurrency(newCurrency) {
    dispatch({ type: actions.SET_CURRENCY, payload: newCurrency });
  }

  return { currency, setCurrency };
}

export default useCurrency;

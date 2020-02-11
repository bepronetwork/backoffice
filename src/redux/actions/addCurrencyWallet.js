export const ADD_CURRENCY_WALLET = 'ADD_CURRENCY_WALLET';

export function addCurrencyWallet(data) {
  return {
    type: ADD_CURRENCY_WALLET,
    action : data
  };
}



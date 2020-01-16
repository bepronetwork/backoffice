export const SET_DATA_WALLET_VIEW = 'SET_DATA_WALLET_VIEW';

export function setWalletView(data) {
  return {
    type: SET_DATA_WALLET_VIEW,
    action : data
  };
}



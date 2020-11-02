export const SET_USERS_DATA = "SET_USERS_DATA";
export const SET_GAMES_DATA = "SET_GAMES_DATA";
export const SET_BETS_DATA = "SET_BETS_DATA";
export const SET_REVENUE_DATA = "SET_REVENUE_DATA";
export const SET_WALLET_DATA = "SET_WALLET_DATA";
export const SET_WITHDRAWALS_DATA = "SET_WITHDRAWALS_DATA";

export function setUsersData(data) {
  return {
    type: SET_USERS_DATA,
    payload: data,
  };
}

export function setGamesData(data) {
  return {
    type: SET_GAMES_DATA,
    payload: data,
  };
}

export function setBetsData(data) {
  return {
    type: SET_BETS_DATA,
    payload: data,
  };
}

export function setRevenueData(data) {
  return {
    type: SET_REVENUE_DATA,
    payload: data,
  };
}

export function setWalletData(data) {
  return {
    type: SET_WALLET_DATA,
    payload: data,
  };
}

export function setWithdrawalsData(data) {
  return {
    type: SET_WITHDRAWALS_DATA,
    payload: data,
  };
}

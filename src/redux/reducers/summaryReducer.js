const initialState = {
  users: [],
  games: [],
  bets: [],
  revenue: [],
  wallet: [],
  withdrawals: [],
};

export default function(state = initialState, action) {
  switch (action.type) {
    case "SET_USERS_DATA":
      return { ...state, users: action.payload };
    case "SET_GAMES_DATA":
      return { ...state, games: action.payload };
    case "SET_BETS_DATA":
      return { ...state, bets: action.payload };
    case "SET_REVENUE_DATA":
      return { ...state, revenue: action.payload };
    case "SET_WALLET_DATA":
      return { ...state, wallet: action.payload };
    case "SET_WITHDRAWALS_DATA":
      return {
        ...state,
        withdrawals: [...state.withdrawals, ...action.payload],
      };
    default:
      return state;
  }
}

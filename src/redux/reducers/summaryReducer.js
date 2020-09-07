const initialState = {
    users: [],
    games: []
};

export default function (state = initialState, action) {
    switch (action.type) {
        case 'SET_USERS_DATA':
            return { ...state, users: action.payload }
        case 'SET_GAMES_DATA':
            return { ...state, games: action.payload }
      default:
        return state;
    }
  }
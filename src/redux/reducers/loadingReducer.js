const initialState = false;

export default function (state = initialState, action) {
    switch (action.type) {
        case 'SET_LOADING_STATUS' :
            return action.loading
      default:
        return state;
    }
  }
  
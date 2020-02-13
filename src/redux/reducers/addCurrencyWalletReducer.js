const initialState = {
    isActive : false
};


export default function (state = initialState, action) {
    switch (action.type) {
        case 'ADD_CURRENCY_WALLET' :
            return {...state, ...action.action}
      default:
        return state;
    }
  }
  
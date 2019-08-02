const initialState = {
    blockchain : null,
    currency : null,
    services : []
};


export default function (state = initialState, action) {
    switch (action.type) {
        case 'SET_APP_INFO' :
            return {...state, [action.action.key] : action.action.value}
      default:
        return state;
    }
  }
  
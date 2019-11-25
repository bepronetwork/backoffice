const initialState = {
    isActive : false
};


export default function (state = initialState, action) {
    switch (action.type) {
        case 'SET_MODAL' :
            return {...state, ...action.action, isActive : true}
        case 'CLOSE_MODAL' : 
            return {isActive : false}
      default:
        return state;
    }
  }
  
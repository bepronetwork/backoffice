import {
    SET_USER_VIEW
} from '../actions/userView';

const initialState = {
    
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_USER_VIEW :
            return {...action.action}
      default:
        return state;
    }
  }
  
import {
    SET_GAME_VIEW
} from '../actions/game';

const initialState = {
    
};

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_GAME_VIEW :
            return {...action.action}
      default:
        return state;
    }
  }
  
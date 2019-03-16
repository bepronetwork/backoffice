import {
    SET_WIDGET_INFO
} from '../actions/widgets';

const initialState = {
    casino : false,
    crypto : false
};


export default function (state = initialState, action) {
    switch (action.type) {
        case 'SET_WIDGET_INFO' :
            return {...state, [action.action] : !state[action.action]}
      default:
        return state;
    }
  }
  
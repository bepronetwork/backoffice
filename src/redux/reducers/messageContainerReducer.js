import {
    SET_MESSAGE_NOTIFICATION
} from '../actions/messageContainer';

let initialState = '';

export default function (state = initialState, action) {
    switch (action.type) {
        case SET_MESSAGE_NOTIFICATION :
            return action.action
      default:
        return state;
    }
  }
  
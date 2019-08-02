export const SET_MESSAGE_NOTIFICATION = 'SET_MESSAGE_NOTIFICATION';

export function setMessageNotification(data) {
  return {
    type: SET_MESSAGE_NOTIFICATION,
    action : data
  };
}



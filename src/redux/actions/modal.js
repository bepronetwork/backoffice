export const SET_MODAL = 'SET_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const MODAL_TYPES = {
    USER_AFFILIATE_EDIT : 'USER_AFFILIATE_EDIT'
}

export function setModal(data) {
  return {
    type: SET_MODAL,
    action : data
  };
}


export function closeModal(data) {
    return {
      type: CLOSE_MODAL,
      action : data
    };
  }
  
  
  
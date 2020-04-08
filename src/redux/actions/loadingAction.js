export const SET_LOADING_STATUS = 'SET_LOADING_STATUS';

export function setLoadingStatus(status) {
  return {
    type: SET_LOADING_STATUS,
    loading : status
  };
}



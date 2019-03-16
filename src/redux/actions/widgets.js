export const SET_WIDGET_INFO = 'SET_WIDGET_INFO';

export function setWidgetData(data) {
  return {
    type: SET_WIDGET_INFO,
    action : data
  };
}



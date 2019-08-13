const initialState = 'weekly';

export default function (state = initialState, action) {
    console.log(action);
    switch (action.type) {
        case 'SET_DATA_PERIODICITY' :
            return action.action
      default:
        return state;
    }
  }
  
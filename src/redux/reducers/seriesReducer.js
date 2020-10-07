import { actions } from '../actions/seriesActions';

const initalState = [];

export default function(state = initalState, action) {

    switch (action.type) {
        case actions.SET_SERIES_DATA:
            return action.payload;
        default:
            return state
    }
}
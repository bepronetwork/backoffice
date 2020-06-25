import { actions } from '../actions/matchesActions';

const initalState = [];

export default function(state = initalState, action) {

    switch (action.type) {
        case actions.SET_MATCHES_DATA:
            return action.payload
        default:
            return state
    }
}
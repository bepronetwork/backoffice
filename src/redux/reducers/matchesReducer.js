import { actions } from '../actions/matchesActions';

import _ from 'lodash';

const initalState = [];

export default function(state = initalState, action) {

    switch (action.type) {
        case actions.SET_MATCHES_DATA:
            return action.payload
        case actions.ADD_MATCHES_DATA:
            return _.concat(state, action.payload)
        default:
            return state
    }
}
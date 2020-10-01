import { actions } from '../actions/matchesActions';

import _ from 'lodash';

const initalState = [];

const findAndUpdate = ({ array, data }) => {
    const newArray = [...array];

    const foundIndex = newArray.findIndex(x => x.id === data.id);
    newArray[foundIndex] = data;

    return newArray;
}

export default function(state = initalState, action) {

    switch (action.type) {
        case actions.SET_MATCHES_DATA:
            return action.payload
        case actions.ADD_MATCHES_DATA:
            return _.concat(state, action.payload)
        case actions.UPDATE_MATCH_DATA:
            return findAndUpdate({ array: state, data: action.payload })
        default:
            return state
    }
}
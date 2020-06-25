import { actions } from '../actions/videogamesActions';

const initalState = [];

export default function(state = initalState, action) {

    switch (action.type) {
        case actions.SET_VIDEOGAMES_DATA:
            return action.payload
        default:
            return state
    }
}
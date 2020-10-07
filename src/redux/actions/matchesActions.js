export const actions = Object.freeze({
    SET_MATCHES_DATA: "SET_MATCHES_DATA",
    ADD_MATCHES_DATA: "ADD_MATCHES_DATA",
    UPDATE_MATCH_DATA: "UPDATE_MATCH_DATA"
})

export function setMatchesData(data) {
    return {
        type: actions.SET_MATCHES_DATA,
        payload: data
    }
}

export function addMatchesData(data) {
    return {
        type: actions.ADD_MATCHES_DATA,
        payload: data
    }
}

export function updateMatchData(data) {
    return {
        type: actions.UPDATE_MATCH_DATA,
        payload: data
    }
}
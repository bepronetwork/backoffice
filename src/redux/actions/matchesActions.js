export const actions = Object.freeze({
    SET_MATCHES_DATA: "SET_MATCHES_DATA",
    ADD_MATCHES_DATA: "ADD_MATCHES_DATA"
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
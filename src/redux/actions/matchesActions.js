export const actions = Object.freeze({
    SET_MATCHES_DATA: "SET_MATCHES_DATA"
})

export function setMatchesData(data) {
    return {
        type: actions.SET_MATCHES_DATA,
        payload: data
    }
}
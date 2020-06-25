export const actions = Object.freeze({
    SET_VIDEOGAMES_DATA: "SET_VIDEOGAMES_DATA"
})

export function setVideogamesData(data) {
    return {
        type: actions.SET_VIDEOGAMES_DATA,
        payload: data
    }
}
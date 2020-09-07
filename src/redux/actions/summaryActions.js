export const SET_USERS_DATA = 'SET_USERS_DATA';
export const SET_GAMES_DATA = 'SET_GAMES_DATA';

export function setUsersData(data) {
    return {
        type: SET_USERS_DATA,
        payload: data
    };
}

export function setGamesData(data) {
    return {
        type: SET_GAMES_DATA,
        payload: data
    };
}

import { API_URL, config, addHeaders } from '../api/config';

export const getTeamStats = async ({ params, headers }) => {
    try {
        const response = await fetch(API_URL + `/api/get/videogame/team`, {
            method : 'POST',
            headers : addHeaders(config, headers),
            body : JSON.stringify(params)
        });
        return response.json();
    } catch(err) {
        throw err;
    }
}

export const getPlayerStats = async ({ params, headers }) => {
    try {
        const response = await fetch(API_URL + `/api/get/videogame/player`, {
            method : 'POST',
            headers : addHeaders(config, headers),
            body : JSON.stringify(params)
        });
        return response.json();
    } catch(err) {
        throw err;
    }
}
import { API_URL, config, addHeaders } from '../api/config';

export const setBookedMatch = async ({ params, headers }) => {
    try {
        const response = await fetch(API_URL + `/api/set/matches/booked`, {
            method : 'POST',
            headers : addHeaders(config, headers),
            body : JSON.stringify(params)
        });
        return response.json();
    } catch(err) {
        throw err;
    }
}

export const removeBookedMatch = async ({ params, headers }) => {
    try {
        const response = await fetch(API_URL + `/api/remove/matches/booked`, {
            method : 'POST',
            headers : addHeaders(config, headers),
            body : JSON.stringify(params)
        });
        return response.json();
    } catch(err) {
        throw err;
    }
}
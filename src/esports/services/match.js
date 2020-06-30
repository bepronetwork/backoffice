import { API_URL, config, addHeaders } from '../api/config';

export const getSpecificMatch = async ({ params, headers }) => {
    try {
        const response = await fetch(API_URL + `/api/get/match/specific`, {
            method : 'POST',
            headers : addHeaders(config, headers),
            body : JSON.stringify(params)
        });
        return response.json();
    } catch(err) {
        throw err;
    }
}
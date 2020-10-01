import { API_URL, config, addHeaders } from '../api/config';

import store from '../../containers/App/store';
import { setMatchesData, addMatchesData } from '../../redux/actions/matchesActions';

export const getSeriesMatches = async ({ params, headers, isPagination=false }) => {
    try {
        const res = await fetch(API_URL + `/api/get/matches/series`, {
            method : 'POST',
            headers : addHeaders(config, headers),
            body : JSON.stringify(params)
        });

        const response = await res.json();

        if (response.data.message) {
            isPagination ? 
            store.dispatch(addMatchesData(response.data.message)) 
            : store.dispatch(setMatchesData(response.data.message));
        }

    } catch(err) {
        throw err;
    }
}

export const getBookedSeriesMatches = async ({ params, headers, isPagination=false }) => {
    try {
        const res = await fetch(API_URL + `/api/get/booked/matches/series`, {
            method : 'POST',
            headers : addHeaders(config, headers),
            body : JSON.stringify(params)
        });

        const response = await res.json();

        if (response.data.message) {
            isPagination ? 
            store.dispatch(addMatchesData(response.data.message.map(match => ({...match, booked: true})))) 
            : store.dispatch(setMatchesData(response.data.message.map(match => ({...match, booked: true}))));
        }

    } catch(err) {
        throw err;
    }
}

export const getMatchesAll = async ({ params, headers, isPagination=false }) => {
    try {
        const res = await fetch(API_URL + `/api/get/matches/all`, {
            method : 'POST',
            headers : addHeaders(config, headers),
            body : JSON.stringify(params)
        });

        const response = await res.json();

        if (response.data.message) {
            isPagination ? 
            store.dispatch(addMatchesData(response.data.message)) 
            : store.dispatch(setMatchesData(response.data.message));
        }

    } catch(err) {
        throw err;
    }
}

export const getBookedMatches = async ({ params, headers, isPagination=false }) => {
    try {
        const res = await fetch(API_URL + `/api/get/booked/matches/all`, {
            method : 'POST',
            headers : addHeaders(config, headers),
            body : JSON.stringify(params)
        });

        const response = await res.json();

        if (response.data.message) {
            isPagination ? 
            store.dispatch(addMatchesData(response.data.message.map(match => ({...match, booked: true})))) 
            : store.dispatch(setMatchesData(response.data.message.map(match => ({...match, booked: true}))));
        }

    } catch(err) {
        throw err;
    }
}
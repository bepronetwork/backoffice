import { API_URL, config, addHeaders } from '../api/config';
import _ from 'lodash';

import store from '../../containers/App/store';
import { setVideogamesData } from '../../redux/actions/videogamesActions';
import { setSeriesData } from '../../redux/actions/seriesActions';


export const getVideoGamesAll = async ({ params, headers }) => {
    try {
        const res = await fetch(API_URL + `/api/get/videogames/all`, {
            method : 'POST',
            headers : addHeaders(config, headers),
            body : JSON.stringify(params)
        });

        const response = await res.json();

        if (response.data.message) {
            store.dispatch(setVideogamesData(_.sortBy(response.data.message, 'external_id')));
            store.dispatch(setSeriesData(response.data.message));
        }

    } catch(err) {
        throw err;
    }
}

export const getAllVideogames = async ({ params, headers }) => {
    try {
        const res = await fetch(API_URL + `/api/get/videogames/all`, {
            method : 'POST',
            headers : addHeaders(config, headers),
            body : JSON.stringify(params)
        });

        const response = await res.json();

        return response;

    } catch(err) {
        throw err;
    }
}
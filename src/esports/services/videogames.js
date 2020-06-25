import { apiService } from '../api/connection';
import { pluck } from 'rxjs/operators';
import _ from 'lodash';

import store from '../../containers/App/store';
import { setVideogamesData } from '../../redux/actions/videogamesActions';
import { setSeriesData } from '../../redux/actions/seriesActions';

function authHeaders(bearerToken, id){
    return {
        "authorization" : "Bearer " + bearerToken,
        "payload" : JSON.stringify({ id : id })
    }
}

export const getVideoGamesAll = ({ params, headers: { bearerToken, id } }) => {

    return apiService
        .post("/api/get/videogames/all", {
            headers: authHeaders(bearerToken, id),
            body: JSON.stringify(params)
        })
        .pipe(pluck("response"))
        .subscribe(
        res => {
            if (res.data.message) {
                store.dispatch(setVideogamesData(_.sortBy(res.data.message, 'external_id')));
                store.dispatch(setSeriesData(res.data.message));
            }
        }
    )
};
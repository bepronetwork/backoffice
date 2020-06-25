import { apiService } from '../api/connection';
import { pluck } from 'rxjs/operators';
import _ from 'lodash';

import store from '../../containers/App/store';
import { setVideogamesData } from '../../redux/actions/videogamesActions';
import { setSeriesData } from '../../redux/actions/seriesActions';

export const getVideoGamesAll = ({ params, headers }) => {

    return apiService
        .post("/api/get/videogames/all", {
            // headers: addHeaders(config, headers),
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
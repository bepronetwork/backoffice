import { apiService } from '../api/connection';
import { pluck } from 'rxjs/operators';

import store from '../../containers/App/store';
import { setMatchesData } from '../../redux/actions/matchesActions';

export const getSeriesMatches = ({ params, headers }) => {
    return apiService
        .post("/api/get/matches/series", {
            // headers: addHeaders(config, headers),
            body: JSON.stringify(params)
        })
        .pipe(pluck("response"))
        .subscribe(
            res => {
                if (res.data.message) {
                    store.dispatch(setMatchesData(res.data.message));
                }
            }
        )
};
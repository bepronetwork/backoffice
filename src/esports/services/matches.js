import { apiService } from '../api/connection';
import { pluck } from 'rxjs/operators';

import store from '../../containers/App/store';
import { setMatchesData, addMatchesData } from '../../redux/actions/matchesActions';

export const getSeriesMatches = ({ params, headers, isPagination=false }) => {
    return apiService
        .post("/api/get/matches/series", {
            headers: headers,
            body: JSON.stringify(params)
        })
        .pipe(pluck("response"))
        .subscribe(
            res => {
                if (res.data.message) {
                    isPagination ? 
                    store.dispatch(addMatchesData(res.data.message)) 
                    : store.dispatch(setMatchesData(res.data.message));
                }
            }
        )
};

export const getMatchesAll = ({ params, headers, isPagination=false }) => {
    return apiService
        .post("/api/get/matches/all", {
            headers: headers,
            body: JSON.stringify(params)
        })
        .pipe(pluck("response"))
        .subscribe(
            res => {
                if (res.data.message) {
                    isPagination ? 
                    store.dispatch(addMatchesData(res.data.message)) 
                    : store.dispatch(setMatchesData(res.data.message));
                }
            }
        )
};
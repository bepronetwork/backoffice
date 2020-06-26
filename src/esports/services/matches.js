import { apiService } from '../api/connection';
import { pluck } from 'rxjs/operators';

import store from '../../containers/App/store';
import { setMatchesData, addMatchesData } from '../../redux/actions/matchesActions';

function authHeaders(bearerToken, id){
    return {
        "authorization" : "Bearer " + bearerToken,
        "payload" : JSON.stringify({ id : id })
    }
}

export const getSeriesMatches = ({ params, headers: { bearerToken, id }, isPagination = false }) => {
    return apiService
        .post("/api/get/matches/series", {
            headers: authHeaders(bearerToken, id),
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

export const getMatchesAll = ({ params, headers: { bearerToken, id }, isPagination = false }) => {
    return apiService
        .post("/api/get/matches/all", {
            headers: authHeaders(bearerToken, id),
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
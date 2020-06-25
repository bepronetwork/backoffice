import { apiService } from '../api/connection';
import { pluck } from 'rxjs/operators';

export const getSeriesMatches = ({ params, headers }) => {
    return apiService
        .post("/api/get/matches/series", {
            // headers: addHeaders(config, headers),
            body: JSON.stringify(params)
        })
        .pipe(pluck("response"));
};
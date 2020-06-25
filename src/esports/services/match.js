import { apiService } from '../api/connection';
import { pluck } from 'rxjs/operators';

export const getSpecificMatch = ({ params, headers }) => {
    return apiService
        .post("/api/get/match/specific", {
            // headers: addHeaders(config, headers),
            body: JSON.stringify(params)
        })
        .pipe(pluck("response"));
};
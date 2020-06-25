import { apiService } from '../api/connection';
import { pluck } from 'rxjs/operators';

export const getVideoGamesAll = ({ params, headers }) => {
    return apiService
        .post("/api/get/videogames/all", {
            // headers: addHeaders(config, headers),
            body: JSON.stringify(params)
        })
        .pipe(pluck("response"));
};
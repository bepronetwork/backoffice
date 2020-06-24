import { PANDASCORE_API_URL, headers } from "./config";

import { ajax } from "rxjs/ajax";

const apiServiceBuilder = method => (url) =>
  ajax({
    url: `${PANDASCORE_API_URL}${url}`,
    method,
    headers: {
      ...headers.authorization,
      "Content-Type": "application/json"
    }
});

export const apiService = {
  get: apiServiceBuilder("GET")
};
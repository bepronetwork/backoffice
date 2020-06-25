import { API_URL } from "./config";

import { ajax } from "rxjs/ajax";

const apiServiceBuilder = method => (
  url,
  { headers, body } = { headers: {}, body: {} }
) =>
  ajax({
    url: `${API_URL}${url}`,
    method,
    headers: {
      // ...headers.authorization,
      ...headers,
      "Content-Type": "application/json"
    },
    body
});

export const apiService = {
  post: apiServiceBuilder("POST")
};

function addHeaders(config, newHeaders) {
  return {
    ...config.headers,
    ...newHeaders
  }
}
import axios from 'axios';
import { successHandler, errorHandler } from './interceptors';

const api = axios.create();

api.interceptors.response.use(
  response => successHandler(response),
  error => errorHandler(error)
);

export default api;

const {
  REACT_APP_API_MASTER,
  REACT_APP_API_WITHDRAW,
  REACT_APP_API_ESPORTS,
  REACT_APP_WEBSOCKET_ESPORTS
} = process.env;

export {
  REACT_APP_API_MASTER as master,
  REACT_APP_API_WITHDRAW as withdraw,
  REACT_APP_API_ESPORTS as esports,
  REACT_APP_WEBSOCKET_ESPORTS as websocket
};

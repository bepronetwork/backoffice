import io from 'socket.io-client';
import { createContext } from 'react';

export const WEBSOCKET_ESPORTS_URL = process.env.REACT_APP_WEBSOCKET_ESPORTS;

const socketConnection = createContext({
    connection: io(WEBSOCKET_ESPORTS_URL, {
      transport: ["websocket"]
    })
});

export default socketConnection;
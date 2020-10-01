import io from 'socket.io-client';
import { createContext } from 'react';

const socketConnection = createContext({
    connection: io("wss://esports-listener-dev.herokuapp.com", {
      transport: ["websocket"]
    })
});

export default socketConnection;
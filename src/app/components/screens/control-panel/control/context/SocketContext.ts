import { createContext } from 'react';
import { Socket } from 'socket.io-client';

interface ISocketContext {
   socket: Socket | null;
   setSocket: (socket: Socket) => void;
}

const defaultState = {
   socket: null,
   setSocket: () => {},
};

export const SocketContext = createContext<ISocketContext>(defaultState);

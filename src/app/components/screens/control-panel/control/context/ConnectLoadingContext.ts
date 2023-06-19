import { createContext } from 'react';

interface IConnectLoadingContext {
   connectLoading: boolean;
   setConnectLoading: (connectLoading: boolean) => void;
}

const defaultState = {
   connectLoading: false,
   setConnectLoading: () => {},
};

export const ConnectLoadingContext =
   createContext<IConnectLoadingContext>(defaultState);

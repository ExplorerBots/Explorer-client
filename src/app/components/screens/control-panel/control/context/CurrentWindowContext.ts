import { ICurrentWindow } from '@/app/interfaces';
import { createContext } from 'react';

interface ICurrentWinowContext {
   currentWindow: ICurrentWindow | null;
   setCurrentWindow: (currentWindow: ICurrentWindow) => void;
}

const defaultState = {
   currentWindow: null,
   setCurrentWindow: () => {},
};

export const CurrentWinowContext =
   createContext<ICurrentWinowContext>(defaultState);

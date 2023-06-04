import { IBot } from '@/app/interfaces';
import { createContext } from 'react';

interface ICurrentBotContext {
   currentBot: IBot | null;
   setCurrentBot: (currentBot: IBot) => void;
}

const defaultState = {
   currentBot: null,
   setCurrentBot: () => {},
};

export const CurrentBotContext =
   createContext<ICurrentBotContext>(defaultState);

'use client';
import { IBot } from '@/interfaces';
import { ReactNode, createContext, useEffect, useState } from 'react';
import { useFetchBot } from './queries';

interface IBotContext {
   bot: IBot | null;
   setBot: (bot: IBot | null) => void;
   isLoading: boolean;
}

const defaultValue = { bot: null, setBot: () => {}, isLoading: true };

export const BotContext = createContext<IBotContext>(defaultValue);

export const BotProvider = ({
   children,
   botId,
}: {
   children: ReactNode;
   botId: number;
}) => {
   const [bot, setBot] = useState<IBotContext['bot']>(null);
   const { data, isLoading } = useFetchBot(botId);

   useEffect(() => data && setBot(data), [data]);
   return (
      <BotContext.Provider value={{ bot, setBot, isLoading }}>
         {children}
      </BotContext.Provider>
   );
};

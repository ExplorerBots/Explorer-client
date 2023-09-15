'use client';
import { IBot } from '@/interfaces';
import {
   createContext,
   FC,
   PropsWithChildren,
   ReactNode,
   useEffect,
   useState,
} from 'react';
import { useFetchBots } from './queries';

interface IBotsContext {
   bots: IBot[];
   setBots: (bots: IBot[]) => void;
   botsIsLoading: boolean;
}

const defaultValue = { bots: [], setBots: () => {}, botsIsLoading: true };

export const BotsContext = createContext<IBotsContext>(defaultValue);

export const BotsProvider: FC<PropsWithChildren<{ children: ReactNode }>> = ({
   children,
}) => {
   const [bots, setBots] = useState<IBotsContext['bots']>([]);
   const { data, isLoading, error } = useFetchBots();

   useEffect(() => data && setBots(data), [data]);

   return (
      <BotsContext.Provider value={{ bots, setBots, botsIsLoading: isLoading }}>
         {children}
      </BotsContext.Provider>
   );
};

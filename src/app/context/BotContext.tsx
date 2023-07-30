import { IBot } from '@/app/interfaces';
import {
   createContext,
   FC,
   PropsWithChildren,
   ReactNode,
   useEffect,
   useState,
} from 'react';
import { useGetBot } from '../components/screens/control-panel/control/hooks/useGetBot';

interface IBotContext {
   bot: IBot | null;
   setBot: (bot: IBot | null) => void;
   isLoading: boolean;
}

const defaultValue = { bot: null, setBot: () => {}, isLoading: true };

export const BotContext = createContext<IBotContext>(defaultValue);

export const BotProvider: FC<
   PropsWithChildren<{ children: ReactNode; botId: number | undefined }>
> = ({ children, botId }) => {
   const [bot, setBot] = useState<IBotContext['bot']>(null);
   const { data, isLoading } = useGetBot(botId);

   useEffect(() => data && setBot(data), [data]);
   return (
      <BotContext.Provider value={{ bot, setBot, isLoading }}>
         {children}
      </BotContext.Provider>
   );
};

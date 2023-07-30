import { IBot } from '@/app/interfaces';
import {
   createContext,
   FC,
   PropsWithChildren,
   ReactNode,
   useEffect,
   useState,
} from 'react';
import { useGetBots } from '../components/screens/control-panel/initial/hooks/useGetBots';

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
   const { getBots, isLoading: botsIsLoading, error } = useGetBots();

   const handleGetBots = async () => {
      const response = await getBots();

      if (!response) return;

      setBots(response);
   };

   useEffect(() => {
      handleGetBots();
   }, []);

   return (
      <BotsContext.Provider value={{ bots, setBots, botsIsLoading }}>
         {children}
      </BotsContext.Provider>
   );
};

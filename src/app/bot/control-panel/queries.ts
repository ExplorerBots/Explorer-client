import { botsService } from '@/services/bots/bots.service';
import { useQuery } from 'react-query';

export const useFetchBots = () => {
   const { data, isLoading, error } = useQuery(['get bots'], () =>
      botsService.myBots()
   );

   return { data, isLoading, error };
};

import { botsService } from '@/app/services/bots/bots.service';
import { useMutation } from 'react-query';

export const useGetBots = () => {
   const {
      mutateAsync: getBots,
      isLoading,
      error,
   } = useMutation('get bots', () => botsService.myBots());

   return { getBots, isLoading, error };
};
